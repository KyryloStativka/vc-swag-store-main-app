import type { Metadata } from "next";
import { Suspense } from "react";
import { HeroSection } from "@/components/home-page/hero-section";
import { FeaturedProducts, FeaturedProductsSkeleton } from "@/components/home-page/featured-products";

export const metadata: Metadata = {
  title: "Home",
  description: "Shop official Vercel merchandise.",
  openGraph: {
    title: "Vercel Swag Store",
    description: "Shop official Vercel merchandise.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}