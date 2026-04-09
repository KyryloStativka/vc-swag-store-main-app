'use client';
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";
import { CartBadgeWrapper } from "@/components/cart/cart-badge-wrapper";

export function HeaderCartButton({ badge }: { badge: React.ReactNode }) {
    const { setMiniCartOpen } = useCart();
    
    return (
        <Button variant="ghost" size="sm" className="relative" onClick={() => setMiniCartOpen(true)}>
            <ShoppingCart className="size-4" />
            <CartBadgeWrapper>
                {badge}
            </CartBadgeWrapper>
        </Button>
    );
}