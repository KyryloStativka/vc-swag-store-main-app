'use client';

import { useCart } from "@/components/cart/cart-context";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export function MiniCart({children}: { children: React.ReactNode }) {
    const { isMiniCartOpen, setMiniCartOpen } = useCart();

    return (
        <Sheet open={isMiniCartOpen} onOpenChange={setMiniCartOpen}>
            <SheetContent side="right" className="w-full sm:w-[400px] gap-0">
                <SheetTitle className="text-2xl font-semibold p-4 border-b">Your Cart:</SheetTitle>
                {children}
            </SheetContent>
        </Sheet>
    );
}