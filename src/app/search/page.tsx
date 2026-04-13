import { SearchForm } from "@/components/search/search-form";
import { SearchResultHolder } from "@/components/search/search-result-holder";
import { CategorySidebar } from "@/components/search/category-sidebar";
import { Suspense } from "react";
import { getCategories } from "@/lib/products";
import { FeaturedProductsSkeleton } from "@/components/home-page/featured-products";
import { getBaseMetadata } from "@/lib/store";

import type { SearchPageProps } from "@/lib/types";

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-4">Search Page</h1>
      <Suspense fallback={<SearchFormSkeleton />}>
        <SearchForm initQuery="" />
      </Suspense>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <Suspense fallback={<CategorySidebarSkeleton />}>
          <CategoriesSection searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<FeaturedProductsSkeleton count={6} />}>
          <SearchResultHolder searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
    const baseMetadata = await getBaseMetadata();
    const { query } = await searchParams;
    const title = query ? `Search results for "${query}"` : "Search Products";
    const description = query ? `Find products matching "${query}" in our store.` : "Search for products in our store.";
    
    return {
        ...baseMetadata,
        title,
        description,
    };
}

async function CategoriesSection({ searchParams }: SearchPageProps) {
    const { category } = await searchParams;
    const categories = await getCategories();
    return <CategorySidebar categories={categories} currentCategory={category} />;
}

function CategorySidebarSkeleton() {
    return (
        <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded animate-pulse">
            <div className="h-6 w-3/4 bg-gray-300 mb-4 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded" />
            <div className="h-4 w-1/3 bg-gray-300 mb-2 rounded" />
            <div className="h-4 w-2/3 bg-gray-300 mb-2 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 mb-2 rounded" />
        </div>
    );
}

function SearchFormSkeleton() {
    return (
        <div className="animate-pulse m-auto max-w-[450px]">
            <div className="h-10 bg-gray-200 rounded" />
        </div>
    );
}
