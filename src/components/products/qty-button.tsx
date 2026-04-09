'use client';

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { QtyButtonProps } from "@/lib/types";

export function QtyButton({ quantity, setQuantity, stock, disabled }: QtyButtonProps) {
    const atMin = quantity <= 1;
    const atMax = stock !== undefined && quantity >= stock;
    const [internalQty, setInternalQty] = useState(quantity);

    // Sync internal quantity with prop changes (e.g., when cart updates)
    useEffect(() => {
        setInternalQty(quantity);
    }, [quantity]);

    function handleInternalChange(newQty: number) {
        if (isNaN(newQty)) return; // Ignore non-numeric input
        if (newQty < 1) {
            setInternalQty(1);
            setQuantity(1);
        } else if (stock !== undefined && newQty > stock) {
            setInternalQty(stock);
            setQuantity(stock);
        } else {
            setInternalQty(newQty);
            setQuantity(newQty);
        }
    }
    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="quantity" className="text-sm uppercase font-bold text-gray-700">Qty:</label>
            <Button
                className="p-2"
                disabled={disabled || atMin}
                onClick={(e) => { e.preventDefault(); if (!atMin) handleInternalChange(internalQty - 1); }}
            >
                <Minus size={14} />
            </Button>
            
            <Input id="quantity" className="w-12 text-center" value={internalQty} min={0} max={stock} onChange={(e) => handleInternalChange(Number(e.target.value))} />
            <Button
                className="p-2"
                disabled={disabled || atMax}
                onClick={(e) => { e.preventDefault(); if (!atMax) handleInternalChange(internalQty + 1); }}
            >
                <Plus size={14} />
            </Button>
        </div>
    );
}