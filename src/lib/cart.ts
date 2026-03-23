import 'server-only';
import { apiPost, apiGet } from './api-client';
import { cookies } from 'next/headers';
import type { Cart } from './types';

export async function getCartToken(): Promise<string> {
    const cookieStore = await cookies();
    return cookieStore.get('cartToken')?.value || '';
}

export async function setCartToken(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('cartToken', token, { path: '/', maxAge: 60 * 60 * 24 }); // Expires in 1 day
}

export async function getCart(): Promise<Cart | null> {
    const cartToken = await getCartToken();
    if (!cartToken) return null;

    try {
        const response = await apiGet<Cart>('/cart', undefined, { cartToken });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
    }
}


export async function createCart(): Promise<string> {
    const existingToken = await getCartToken();
    if (existingToken) {
        return existingToken;
    }

    const response = await apiPost<{ cartId: string, token: string }>('/cart/create', {});
    const token = response.data?.token;

    if (token) {
        await setCartToken(token);
    } else {
        throw new Error('Failed to create cart: No token returned');
    }

    return token;
}