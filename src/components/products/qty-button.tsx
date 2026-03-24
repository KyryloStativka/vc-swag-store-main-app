'use client';

import { Button } from "@/components/ui/button";
import type { QtyButtonProps } from "@/lib/types";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";


export function QtyButton({ quantity, setQuantity, stock, disabled }: QtyButtonProps) {
    const atMin = quantity <= 1;
    const atMax = stock !== undefined && quantity >= stock;

    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="quantity" className="text-sm uppercase font-bold text-gray-700">Qty:</label>
            <Button
                className="p-2"
                disabled={disabled || atMin}
                onClick={(e) => { e.preventDefault(); setQuantity(quantity - 1); }}
            >
                <Minus size={14} />
            </Button>
            <span id="quantity" className="w-4 text-center">{quantity}</span>
            <Button
                className="p-2"
                disabled={disabled || atMax}
                onClick={(e) => { e.preventDefault(); setQuantity(quantity + 1); }}
            >
                <Plus size={14} />
            </Button>
        </div>
    );
}