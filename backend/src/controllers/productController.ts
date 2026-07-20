import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const search = (req.query.search as string) || '';
    const categories = (req.query.categories as string) || '';
    const sortBy = ((req.query.sortBy as string) || 'createdAt') as string;
    const order = ((req.query.order as string) || 'desc') as 'asc' | 'desc';
    const allowedSortFields = ['name', 'quantity', 'category'];

    // Build the base match filter
    const filter: any = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (categories) {
      const catArray = categories
        .split(',')
        .filter(id => mongoose.Types.ObjectId.isValid(id))
        .map(id => new mongoose.Types.ObjectId(id));
      filter.categories = { $in: catArray };
    }

    // ---------- Aggregation pipeline with $facet to combine data + count in a single DB round-trip ----------
    const pipeline: any[] = [
      { $match: filter },
      // Lookup category documents so we can sort/display by category name
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
        },
      },
    ];

    // Compute a sortable field for category sort
    if (sortBy === 'category') {
      pipeline.push({
        $addFields: {
          firstCategoryName: { $arrayElemAt: ['$categories.name', 0] },
        },
      });
    }

    if (allowedSortFields.includes(sortBy)) {
      const sortField = sortBy === 'category' ? 'firstCategoryName' : sortBy;
      pipeline.push({ $sort: { [sortField]: order === 'asc' ? 1 : -1 } });
    } else {
      // Default sort by newest first
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    // $facet runs two sub-pipelines in one round trip:
    // - "data": paginates and returns the products for this page
    // - "totalCount": counts all matching documents
    pipeline.push({
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: 'count' }],
      },
    });

    const [result] = await Product.aggregate(pipeline);
    const products = result?.data ?? [];
    const total = result?.totalCount?.[0]?.count ?? 0;

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, quantity, categories } = req.body;
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      res.status(400).json({ message: 'Product name must be unique' });
      return;
    }

    const newProduct = new Product({ name, description, quantity, categories });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
