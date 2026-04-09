import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { CartItemUpdate } from "@/components/cart/cart-item-update";
import type { CartItem } from "@/lib/types";
import { getCart } from "@/lib/cart";


export async function CartItems() {
    const cartData = await getCart();

    if (!cartData || cartData.items.length === 0) {
        return <p className="text-gray-600">Your cart is currently empty.</p>;
    }
    return (
        <div className="cart-items-holder overflow-scroll max-h-3/4-screen">
            {cartData.items.map((item: CartItem) => (
                <div key={item.product.id} className="border-b p-4 flex flex-col gap-4 last-gap-0 last:border-0">
                    <div className="item-img flex gap-4 items-center">
                        <Link href={`/products/${item.product.slug}`} className="flex items-center gap-4 overflow-hidden">
                            <Image src={item.product?.images[0] ?? "/placeholder.png"} className="hover:scale-105 transition-transform" alt={item.product.name} width={100} height={100} />
                        </Link>
                        <div className="item-holder">
                            <Link href={`/products/${item.product.slug}`} className="text-primary font-bold hover:underline">
                                {item.product.name}
                            </Link>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                    <div className="qty-holder w-full flex items-center justify-center">
                        <CartItemUpdate item={item} />
                    </div>
                    <div className="price-holder text-right">
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
        return ;
    }
     return (
        <div className="text-left border-t p-4">
            <p className="text-2xl mt-0 flex items-center gap-2">
             Total:<span className="font-bold text-3xl ml-auto"> {formatPrice(cartData.subtotal, cartData.currency)}</span>
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