import Link from "next/link";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="bg-white py-12 h-screen max-h-1/2 flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Vercel Swag Store</h1>
        <p className="text-lg text-gray-700 mb-2">
          Shop official Vercel merchandise and show off your love for our platform!
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Stock up on t-shirts, hoodies, stickers, and more. Perfect for developers and fans alike.
        </p>
        <Link
          href="/products"
        >
            <Button variant="default" size="xl" className="px-6 text-lg"> 
                Shop Now
            </Button>       
        </Link>
      </div>
    </section>
  );
}