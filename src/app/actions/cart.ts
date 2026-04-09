'use server';
import { createCart, getCartToken } from "@/lib/cart";
import { revalidatePath } from "next/cache";
import { apiPatch, apiDelete , apiPost } from "@/lib/api-client";
import type { ActionResult } from "@/lib/types";


export async function addToCart(productId: string, quantity: number): Promise<ActionResult<string>> {
    try {
        const cartToken = await createCart()
        await apiPost('/cart', {
            productId: productId,
            quantity: quantity
        }, { cartToken });

        // revalidatePath('/cart', 'page');
        
        return { success: true, data: cartToken };
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { success: false, error: 'Failed to add product to cart. Please try again.' };
    }
}

export async function updateCartItem(itemId: string, quantity: number): Promise<ActionResult> {
   try {
       const cartToken = await getCartToken();

        if (!cartToken) {
            return { success: false, error: 'No cart found. Please add an item to the cart first.' };
        }

        await apiPatch(`/cart/${itemId}`, { quantity }, { cartToken });

        revalidatePath('/cart', 'page');
        
        return { success: true };
    } catch (error) {
        console.error('Error updating cart item:', error);
        return { success: false, error: 'Failed to update cart item. Please try again.' };
    }
}

export async function removeCartItem(itemId: string):Promise<ActionResult> {
   try {
        const cartToken = await getCartToken();
        if (!cartToken) {
            return { success: false, error: 'No cart found. Please add an item to the cart first.' };
        }

        await apiDelete(`/cart/${itemId}`, { cartToken });

        revalidatePath('/cart', 'page');
        
        return { success: true };
    } catch (error) {
        console.error('Error removing cart item:', error);
        return { success: false, error: 'Failed to remove cart item. Please try again.' };
    }
}