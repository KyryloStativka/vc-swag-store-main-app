import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
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
  themeColor: "#000000",
  openGraph: {
    siteName: "Vercel Swag Store",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
