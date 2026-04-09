'use client';

import { createContext, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { CartContextType } from "@/lib/types";

const CartContext = createContext<CartContextType>({
    isCartPending: false,
    setCartPending: () => {},
    refreshCart: () => {}
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [manualPending, setCartPending] = useState(false);
    const [transitionPending, startCartTransition] = useTransition();
    const router = useRouter();

    function refreshCart() {
       startCartTransition(() => {
            router.refresh(); // isPending stays true until RSC commits
        });
    }

    return (
        <CartContext.Provider value={{ isCartPending: manualPending || transitionPending, setCartPending, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}