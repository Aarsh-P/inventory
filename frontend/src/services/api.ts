import axios from 'axios';
import type { ProductsApiResponse, ICategory } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (
  page = 1,
  search = '',
  categories = '',
  sortBy = 'createdAt',
  order = 'desc'
): Promise<ProductsApiResponse> => {
  const response = await api.get<ProductsApiResponse>('/products', {
    params: { page, search, categories, sortBy, order }
  });
  return response.data;
};

export const createProduct = async (productData: {
  name: string;
  description: string;
  quantity: number;
  categories: string[];
}) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/products/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await api.get<ICategory[]>('/categories');
  return response.data;
};

export default api;
