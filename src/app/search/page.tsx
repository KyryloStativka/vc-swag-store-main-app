import { SearchForm } from "@/components/search/search-form";
import type { SearchPageProps } from "@/lib/types";
import { SearchResultHolder } from "@/components/search/search-result-holder";
import { CategorySidebar } from "@/components/search/category-sidebar";
import { Suspense } from "react";
import { getCategories } from "@/lib/products";
import { FeaturedProductsSkeleton } from "@/components/homePage/featured-products";


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

async function SearchPageContent({searchParams}: SearchPageProps) {
  const {query, category} = await searchParams;
  const categories = await getCategories();

  return (
    <>
     <SearchForm initQuery={query || ''} />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <Suspense fallback={<div className="w-full md:w-1/4 p-4 bg-gray-100 rounded animate-pulse">Loading categories...</div>}>
          <CategorySidebar categories={categories} currentCategory={category} />
        </Suspense>
        <Suspense  key={`${query}-${category}`} fallback={<div className="container mx-auto px-4 md:px-0"><FeaturedProductsSkeleton count={6}/></div>}>
          <SearchResultHolder query={query || ''} category={category} />
        </Suspense>
      </div>
    </>
  );
}


function SearchPageSkeleton() {
  return (
    <div className="container mx-auto py-2 px-4 md:px-0">
      <div className="bg-gray-100 py-5 animate-pulse m-auto max-w-[450px]"></div>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded animate-pulse">Loading categories...</div>
        <div className="container mx-auto px-4 md:px-0"><FeaturedProductsSkeleton count={6}/></div>
      </div>
    </div>
  );
}