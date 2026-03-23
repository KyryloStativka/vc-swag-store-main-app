import type { Product } from "@/lib/types";

export function TagsHolder({ product, className = "" }: { product: Product, className?: string }) {
    return (
        <div className={"tags mb-auto " + className}>
            {product.tags.map((tag) => (
            <span
                key={tag}
                className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-2"
            >
                {tag}
            </span>
            ))}
      </div>
    );
}