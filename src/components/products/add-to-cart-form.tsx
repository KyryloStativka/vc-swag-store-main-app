'use client';
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState, useTransition } from "react";
import {addToCart} from "@/app/actions/cart";
import {toast} from "sonner";


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
            <div className="flex items-center gap-3">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Qty:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={productStock.stock}
                    value={quantity}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>{ 
                        const value = e.target.value;
                        if(value === '') return;
                        setQuantity(Number(value));
                        }
                    }
                    className="w-20 rounded-md px-3 border-b-primary text-sm shadow-sm ring-1"
                />
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