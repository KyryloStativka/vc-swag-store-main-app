import 'server-only';
import {cacheLife, cacheTag} from 'next/cache'
import { apiGet } from './api-client';

import type { Product, Category, StockInfo } from './types';

export async function getPromoProducts() {
  'use cache';
  cacheTag('promoProducts');
  cacheLife('promoProducts');
  
  const response = await apiGet<Product[]>('/products',{featured: 'true'});
  return response.success ? response.data : [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    'use cache';
    cacheTag(`products`);
    cacheLife(`products`);
    
    const response = await apiGet<Product>(`/products/${slug}`);
    return response.success ? response.data : null;
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
    'use cache';
    cacheTag(`products`);
    cacheLife(`products`);
    
    const response = await apiGet<Product[]>('/products', { ids: ids.join(',') });
    return response.success ? response.data : [];
}

export async function getProductStock(productId: string): Promise<StockInfo> {
    const response = await apiGet<StockInfo>(`/products/${productId}/stock`);
    return response.success ? response.data : { productId, stock: 0, inStock: false, lowStock: false };
}

export async function getCategories(): Promise<Category[]> {
    'use cache';
    cacheTag('categories');
    cacheLife('categories');
    
    const response = await apiGet<Category[]>('/categories');
    return response.success ? response.data : [];
}

export async function getProducts(
    query?: string,
    category?: string,
    page: number = 1,
    limit: number = 20
): Promise<{ products: Product[]; page: number; limit: number }> {
    'use cache';
    cacheTag('searchProducts');
    cacheLife('searchProducts');

    const params: Record<string, string> = { page: page.toString(), limit: limit.toString() };
    if (query) params.search = query;
    if (category) params.category = category;

    const response = await apiGet<Product[]>('/products', params);
    return response.success ? { products: response.data, page, limit} : { products: [], page, limit };
}