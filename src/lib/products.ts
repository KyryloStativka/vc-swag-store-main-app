import 'server-only';
import {cacheLife, cacheTag} from 'next/cache'
import { apiGet } from './api-client';

import type { Product, PaginationMeta } from './types';

export async function getProducts(
  page: number = 1,
  limit: number = 10,
  category?: string,
  search?: string
): Promise<{ products: Product[]; meta: PaginationMeta }> {
    'use cache';
    cacheTag('products');
    cacheLife('products');
    
   const params: Record<string, string> = { page: page.toString(), limit: limit.toString() };
   
    if (category) params.category = category;
    if (search) params.search = search;
    
    const response = await apiGet<Product[]>('/products', params);
    return { products: response.data, meta: response.meta?.pagination ?? {} as PaginationMeta };
}

export async function getPromoProducts() {
  'use cache';
  cacheTag('promoProducts');
  cacheLife('promoProducts');
  
  const response = await apiGet<Product[]>('/products',{featured: 'true'});
  return response.data;
}