// Shared domain types used across the frontend application

export interface ICategory {
  _id: string;
  name: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  categories: ICategory[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsApiResponse {
  products: IProduct[];
  totalPages: number;
  currentPage: number;
}

export type SortOrder = 'asc' | 'desc';

export type SortField = 'name' | 'quantity' | 'category' | 'createdAt';
