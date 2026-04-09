import { SearchForm } from "@/components/search/search-form";
import { SearchResultHolder } from "@/components/search/search-result-holder";
import { CategorySidebar } from "@/components/search/category-sidebar";
import { Suspense } from "react";
import { getCategories } from "@/lib/products";
import { FeaturedProductsSkeleton } from "@/components/homePage/featured-products";
import { getBaseMetadata } from "@/lib/store";

import type { SearchPageProps } from "@/lib/types";

export default function SearchPage({searchParams}: SearchPageProps) {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-4">Search Page</h1>
      <Suspense fallback={<SearchPageSkeleton />}>
        <SearchPageContent searchParams={searchParams} />
      </Suspense>
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

async function SearchPageContent({searchParams}: SearchPageProps) {
  const {query, category} = await searchParams;
  const categories = await getCategories();

  return (
    <>
     <SearchForm initQuery={query || ''} />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
          <CategorySidebar categories={categories} currentCategory={category} />
          <SearchResultHolder query={query || ''} category={category} />
      </div>
    </>
  );
}


function SearchPageSkeleton() {
  return (
    <div className="container mx-auto py-2 px-4 md:px-0">
      <div className="bg-gray-100 py-5 animate-pulse m-auto max-w-[450px]"></div>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded animate-pulse">
          <div className="h-6 w-3/4 bg-gray-300 mb-4 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 mb-2 rounded"></div>
        </div>
        <div className="container mx-auto px-4 md:px-0"><FeaturedProductsSkeleton count={6}/></div>
      </div>
    </div>
  );
}
