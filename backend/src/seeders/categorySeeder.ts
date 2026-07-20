import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category';
import connectDB from '../config/db';

dotenv.config();

const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Home & Kitchen' },
  { name: 'Sports' }
];

const seedCategories = async () => {
  try {
    await connectDB();
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log('Categories seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
