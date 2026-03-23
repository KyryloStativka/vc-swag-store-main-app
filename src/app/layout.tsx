import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: {
    template: "%s | Vercel Swag Store",
    default: "Vercel Swag Store",
  },
  description: "The official Swag Store",
  other: {
    generator: "vswag-cert-v3",
  },
  openGraph: {
    siteName: "Vercel Swag Store",
    type: "website",
    locale: "en_US",
  },
};

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
				<Header />
				{children}
				<Footer />
				<Toaster position="bottom-right" />
			</body>
		</html>
	);
}
