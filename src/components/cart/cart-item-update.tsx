'use client';
import { QtyButton } from "../products/qty-button";
import { updateCartItem, removeCartItem } from "@/app/actions/cart";
import { useOptimistic, useTransition, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import type { CartItem } from "@/lib/types";
import { useCart } from "@/components/cart/cart-context";

export function CartItemUpdate({ item }: { item: CartItem }) {
    const [isPending, startTransition] = useTransition();
    const [quantity, setQuantity] = useOptimistic(item.quantity);
    const { setCartPending } = useCart();

    useEffect(() => {
        setCartPending(isPending);
        return () => setCartPending(false);
    }, [isPending, setCartPending]);

    const handleQtyChange = (newQty: number) => {
        startTransition(async () => {
            setQuantity(newQty);
            try {
                const result = await updateCartItem(item.product.id, newQty);
                if (result.success) {
                    toast.success('Cart updated successfully!');
                } else {
                    toast.error(result.error || 'Failed to update cart item. Please try again.');
                }
            } catch (error) {
                console.error('Error updating cart item:', error);
                toast.error('Failed to update cart item. Please try again.');
            }
        });
    }

    const handleRemove = () => {
        startTransition(async () => {
            try {
                const result = await removeCartItem(item.product.id);
                if (result.success) {
                    toast.success('Item removed from cart!');
                } else {
                    toast.error(result.error || 'Failed to remove item from cart. Please try again.');
                }
            } catch (error) {
                console.error('Error removing cart item:', error);
                toast.error('Failed to remove item from cart. Please try again.');
            }
        });
    }

    return (
        <div className="qty-holder ml-auto flex items-center">
            <QtyButton quantity={quantity} setQuantity={(newQty) => {
                handleQtyChange(newQty);
            }} 
            disabled={isPending}/>
            <Button variant="destructive" className="ml-4 cursor-pointer" onClick={handleRemove} disabled={isPending}>
                <Trash2 size={20} />
            </Button>
            {isPending && <Spinner className="ml-2" />}
        </div>
    );
}       
    