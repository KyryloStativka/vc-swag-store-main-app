'use client';
import { useCart } from "@/components/cart/cart-context";
import { Spinner } from "@/components/ui/spinner";

export function CartBadgeWrapper({children}: {children: React.ReactNode}) {
    const { isCartPending } = useCart();

    if (isCartPending) {
        return (
              <Spinner className="absolute -top-1 -right-[5px] size-5 rounded-full border-1 border-primary p-0 flex items-center justify-center text-xs" />
        );
    }

    return <>{children}</>;
}