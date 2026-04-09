import { Badge } from "@/components/ui/badge";
import { getCart } from "@/lib/cart";

export async function CartBadge() {
	const cartData = await getCart();
	const count = cartData?.totalItems || 0;
	if (count === 0) return null;
	return (
		<Badge variant="secondary" className="absolute -top-1 -right-[5px] size-5 rounded-full border-1 border-primary p-0 flex items-center justify-center text-xs">
			{count}
		</Badge>
	);
}
