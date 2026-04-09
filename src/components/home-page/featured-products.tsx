import { getPromoProducts } from '@/lib/products';
import { ProductItemCard } from '@/components/home-page/product-item-card';
import type { Product, ProductsSkeletonProps } from '@/lib/types';

export async function FeaturedProducts() {
    const productsData = await getPromoProducts(); // Fetch first page with 8 products

    if (!productsData.length) {
        return null; // No products to display, don't render the section
    }

  return (
    <section className="bg-gray-100 py-12" id='featured-products'>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsData.map((product: Product) => (
            <ProductItemCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProductsSkeleton({ count = 8 }: ProductsSkeletonProps) {
  return (
    <section className="bg-gray-100 py-12 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-6 w-full max-w-56 bg-gray-300 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Render skeletons for ProductItemCard components here */}
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="h-130 bg-gray-300 rounded-md"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
