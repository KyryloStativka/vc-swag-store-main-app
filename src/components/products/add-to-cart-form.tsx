'use client';
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState, useTransition } from "react";
import {addToCart} from "@/app/actions/cart";
import {toast} from "sonner";
import { QtyButton } from "./qty-button";


export function AddToCartForm({ productId, productName, productStock }: { productId: string, productName: string, productStock: { stock: number, inStock: boolean } }) {
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        startTransition(async () => {
            try {
                await addToCart(productId, quantity);
                toast.success(`Product ${productName} added to cart!`);
            } catch (error) {
                console.error('Error adding to cart:', error);
                toast.error('Failed to add product to cart. Please try again.');
            }
        });
    }

    return (
        <form className="flex flex-col gap-4">
            <div className="flex items-center gap-3 flex-col sm:flex-row">
                <QtyButton quantity={quantity} stock={productStock.stock} setQuantity={setQuantity} />
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    size="lg"
                    disabled={isPending || !productStock.inStock || quantity > productStock.stock}
                >
                    {isPending ? <>Adding to Cart <Spinner /></> : `Add to Cart`}
                </Button>
            
            </div>
        </form>  
    );
}