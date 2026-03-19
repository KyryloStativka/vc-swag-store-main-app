import 'server-only';
import {cacheLife, cacheTag} from 'next/cache'
import { apiGet } from './api-client';

import type { Promotion } from './types';

export async function getPromotions(): Promise<Promotion | null> {
    'use cache';
    cacheTag('promo');
    cacheLife('promo');
    
    const response = await apiGet<Promotion>('/promotions');
    return response.data ?? null;
}