import {getProductBySlug, getProductStock} from "@/lib/products";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { TagsHolder } from "@/components/products/tags";
import { Suspense } from "react";
import { AddToCartForm } from "@/components/products/add-to-cart-form";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ProductSkeletonLoading />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) notFound();

  return (
    <div className="container mx-auto py-12 px-4 md:px-0 flex flex-row flex-wrap">
        <div className="w-full md:w-1/2 flex center justify-center">
            <Image
                src={product.images[0] ?? '/placeholder.png'}
                alt={product.name}
                width={300}
                height={600}
                className="w-full max-w-[45rem] h-auto object-cover mb-4 rounded"
            />
        </div>
        <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">Product Detail: {product.name}</h1>
            <p className="italic">Slug: {product.slug}</p>
            <TagsHolder product={product} className="my-2"/>
            <p className="max-w-xl">{product.description}</p>
            <div className="flex flex-row items-center my-4 gap-6">
                <p className="font-bold text-2xl">Price: {formatPrice(product.price, product.currency)}</p>
                <StockDisplay slug={product.slug} />
            </div>
             <StockAndCart product={product} />
        </div>
    </div>
  );
}

async function StockDisplay({ slug }: { slug: string }) {
    const stock = await getProductStock(slug);
    return <p className="font-bold text-2xl">Stock: {stock.stock}</p>;
}

async function StockAndCart({ product }: { product: Product }) {
    const stock = await getProductStock(product.slug);
    return <AddToCartForm productId={product.id} productName={product.name} productStock={stock} />;
}

function ProductSkeletonLoading() {
    return (
        <div className="container mx-auto py-8 px-4 md:px-0 flex flex-row animate-pulse gap-4">
            <div className="w-full md:w-1/2 flex center justify-center">
                <div className="w-full max-w-[45rem] h-96 bg-gray-300 rounded mb-4" />
            </div>
            <div className="w-full md:w-1/2">
                <div className="h-8 w-64 bg-gray-300 rounded mb-4" />
                <div className="h-4 w-48 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-72 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-96 bg-gray-300 rounded mb-4" />
                <div className="flex flex-row items-center mt-4 gap-6">
                    <div className="h-8 w-32 bg-gray-300 rounded" />
                    <div className="h-8 w-24 bg-gray-300 rounded" />
                </div>
                <div className="h-10 w-32 bg-gray-300 rounded mt-4" />
            </div>
        </div>
    );
}