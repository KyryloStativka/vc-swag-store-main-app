import Link from "next/link";
import { Suspense } from "react";
import { CartBadge } from "@/components/cart/cart-badge";
import { Button } from "@/components/ui/button";
import { PromoBanner, PromoBannerSkeleton } from "@/components/homePage/promo-banner";
import { HeaderCartButton } from "./header-cart-button";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 items-center justify-between px-8 sm:px-6 lg:px-0">
				<Link
					href="/"
					className="text-lg font-bold tracking-tight text-foreground"
				>
					▲ Swag Store
				</Link>
				<nav className="flex gap-1 mr-auto ml-4">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/">Home</Link>
					</Button>
					<Button variant="ghost" size="sm" asChild>
						<Link href="/search">Search</Link>
					</Button>
				</nav>
				<Suspense fallback={
					<HeaderCartButton badge={<div className="h-4 w-4 rounded-full bg-gray-300 animate-pulse" />} />
				}>
					<HeaderCartButton badge={<CartBadge />} />
				</Suspense>
			</div>
			<Suspense fallback={<PromoBannerSkeleton />}>
				<PromoBanner />
			</Suspense>
		</header>
	);
}
