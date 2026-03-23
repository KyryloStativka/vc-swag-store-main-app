import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = 'USD'): string {
    const priceHolder = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price / 100);
	return priceHolder;
}