'use client';

import { useState } from "react";
import { addToCart } from "@/app/actions/cart";
import { toast } from "sonner";
import { QtyButton } from "@/components/products/qty-button";
import type { StockInfo, ActionResult } from "@/lib/types";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function AddToCartForm({ productId, productName, productStock }: { productId: string, productName: string, productStock: StockInfo }) {
    const [quantity, setQuantity] = useState(1);
    const [isPending, startAction] = useState(false);
    const { setCartPending, refreshCart } = useCart();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        startAction(true);
        setCartPending(true);

        try {
            const result = await addToCart(productId, quantity) as ActionResult;
            if (result.success) {
                toast.success(`${productName} added to cart!`);
                refreshCart();
            } else {
                toast.error(result.error || `Failed to add ${productName} to cart. Please try again.`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error(`Failed to add ${productName} to cart. Please try again.`);
        } finally {
            startAction(false);
            setCartPending(false);
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
                <QtyButton quantity={quantity} stock={productStock.stock} setQuantity={setQuantity} />
                <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isPending || !productStock.inStock || quantity > productStock.stock}
                >
                    {isPending ? <>Adding to Cart <Spinner /></> : `Add to Cart`}
                </Button>
            </div>
        </form>  
    );
}