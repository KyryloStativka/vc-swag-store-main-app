import 'server-only';
import {cacheLife, cacheTag} from 'next/cache'
import { apiGet } from './api-client';
import type { Metadata } from 'next';
import { cache } from 'react';

import type { StoreConfig } from './types';

export const getStoreConfig = cache(async (): Promise<StoreConfig | null> => {
    'use cache';
    cacheTag('store');
    cacheLife('store');
    
    const response = await apiGet<StoreConfig>('/store/config');
    return response.success ? response.data : null;
});


export const getBaseMetadata = cache(async (): Promise<Metadata> => {
  const config = await getStoreConfig();
  
  return {
    title: {
      template: config?.seo?.titleTemplate ?? '%s | Vercel Swag Store',
      default: config?.seo?.defaultTitle ?? 'Vercel Swag Store',
    },
    description: config?.seo?.defaultDescription ?? 'The official Swag Store',
    other: { generator: 'vswag-cert-v3' },
    openGraph: {
      siteName: config?.storeName ?? 'Vercel Swag Store',
      type: 'website',
      locale: 'en_US',
    },
  };
});