import { useState, useCallback, useEffect } from 'react';
import type { IProduct, ICategory, SortField, SortOrder } from '../types';
import { getProducts, getCategories, deleteProduct } from '../services/api';
import toast from 'react-hot-toast';

export function useProductListing() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to load categories';
      toast.error(msg);
      console.error(error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const catString = selectedCats.join(',');
      const data = await getProducts(page, search, catString, sortBy, sortOrder);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to load products';
      toast.error(msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedCats, sortBy, sortOrder]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      if (searchInput !== '') setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteClick = (id: string) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productIdToDelete) return;
    try {
      await deleteProduct(productIdToDelete);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    } finally {
      setIsModalOpen(false);
      setProductIdToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  const toggleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setPage(1);
  };

  const toggleCategory = (id: string) => {
    setSelectedCats(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    setPage(1);
  };

  return {
    // State
    products,
    categories,
    selectedCats,
    searchInput,
    page,
    totalPages,
    loading,
    sortBy,
    sortOrder,
    isModalOpen,
    // Handlers
    setSearchInput,
    setPage,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    toggleSort,
    toggleCategory,
  };
}
