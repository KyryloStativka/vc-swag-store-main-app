import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { TagsHolder } from "@/components/products/tags";

export function ProductItemCard({ product }: { product: Product }) {
    const priceHolder = formatPrice(product.price, product.currency);
  
return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col group">
      <Link href={`/products/${product.slug}`} className="block mb-4 overflow-hidden">
        <Image
          src={product.images[0] ?? '/placeholder.png'}
          alt={product.name}
          width={250}
          height={450}
          className="w-full h-68 object-cover mb-4 rounded group-hover:scale-105 transition-transform"
        />
      </Link>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
    <TagsHolder product={product} />
      <p className="text-gray-700 mb-4">{priceHolder}</p> 
        <Link href={`/products/${product.slug}`}  className="mt-auto">
            <Button variant="default" size="lg" className="w-full mb-2">
                    View Details
            </Button>
        </Link>

    </div>
  );
}