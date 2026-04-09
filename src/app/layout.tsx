import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";
import { getBaseMetadata } from "@/lib/store";
import { CartProvider } from "@/components/cart/cart-context";
import { MiniCart } from "@/components/cart/mini-cart";
import { CartItems, TotalAmount, CartItemsSkeleton } from "@/components/cart/cart-items";
import { Suspense } from "react";

import "./globals.css";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-roboto",
});


export async function generateMetadata(): Promise<Metadata> {
	return await getBaseMetadata();
}

export const viewport: Viewport = {
  themeColor: "#171719",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${roboto.variable} font-sans antialiased`}
			>
				<CartProvider>
					<Header />
					{children}
					<Footer />
					<Toaster position="bottom-right" />
					<MiniCart>
						<Suspense fallback={<CartItemsSkeleton />}>
							<CartItems />
						</Suspense>
						<Suspense fallback={null}>
							<TotalAmount />
						</Suspense>
						</MiniCart>
				</CartProvider>
			</body>
		</html>
	);
}
