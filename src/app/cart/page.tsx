import { getCart } from "@/lib/cart";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { CartItemUpdate } from "@/components/cart/cart-item-update";
import { CartItem } from "@/lib/types";

export default function CartPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-0">
            <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
             <div className="bg-white shadow rounded p-6">
                <Suspense fallback={<CartItemsSkeleton />}>
                     <CartItems />
                </Suspense>
             </div>
             <div className="mt-4">
                <Suspense fallback={<div className="h-12 w-1/6 bg-gray-300 rounded animate-pulse ml-auto"></div>}>
                    <TotalAmount />
                </Suspense>
             </div>

        </div>
    );
}

export async function CartItems() {
    const cartData = await getCart();

    if (!cartData || cartData.items.length === 0) {
        return <p className="text-gray-600">Your cart is currently empty.</p>;
    }
    return (
        <div>
            {cartData.items.map((item: CartItem) => (
                <div key={item.product.id} className="border-b py-4 flex flex-row items-center gap-4">
                    <div className="item-img flex gap-4 items-center w-3/5">
                        <Image src={item.product?.images[0] ?? "/placeholder.png"} alt={item.product.name} width={100} height={100} />
                        <div className="item-holder">
                            <Link href={`/products/${item.product.slug}`} className="text-primary font-bold hover:underline">
                                {item.product.name}
                            </Link>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                    <div className="qty-holder ml-auto w-1/5">
                        <CartItemUpdate item={item} />
                    </div>
                    <div className="price-holder ml-auto text-right w-1/5">
                        <p className="font-bold text-xl">{formatPrice(item.product.price, item.product.currency)}</p>
                        <p className="text-gray-600">Subtotal: {formatPrice(item.product.price * item.quantity, item.product.currency)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export async function TotalAmount() {
    const cartData = await getCart();
    if (!cartData || cartData.items.length === 0) {
        return 0;
    }
     return (
        <div className="text-right">
            <p className="text-xl font-bold">
                Total: {formatPrice(cartData.subtotal, cartData.currency)}
            </p>
        </div>
    );
}

export function CartItemsSkeleton() {
    return (
        <div>
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border-b py-4 animate-pulse">
                    <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                </div>
            ))}
        </div>
    );
}