'use server';
import { createCart } from "@/lib/cart";
import { apiPost } from "@/lib/api-client";
import { revalidatePath } from "next/cache";


export async function addToCart(productId: string, quantity: number) {
    const cartToken = await createCart();
// TODO: manage stock validation and error handling
    await apiPost('/cart', {
        productId: productId,
        quantity: quantity
    }, { cartToken });

    revalidatePath('/','layout');
    revalidatePath('/products/[slug]', 'page');

    return cartToken;
}
