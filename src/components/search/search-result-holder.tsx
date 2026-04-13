import { getProducts } from "@/lib/products";
import { ProductItemCard } from "@/components/home-page/product-item-card";
import { Spinner } from "@/components/ui/spinner";
import type { SearchPageProps } from "@/lib/types";


export async function SearchResultHolder({ searchParams }: Pick<SearchPageProps, 'searchParams'>) {    
    const { query = '', category } = await searchParams;
    const { products } = await getProducts(query, category, 1, 20);


    if (products.length > 0) {
        return (
            <div className="container mx-auto p-4 md:px-0">
                <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductItemCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="container mx-auto p-4 md:px-0">
                <h2 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h2>
                <p className="text-gray-700">No products found.</p>
            </div>
        );
    }

}


export function SearchHolderSpinner() {
    return (
        <div className="container mx-auto p-4 md:px-0">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            <Spinner />
        </div>
    );
}