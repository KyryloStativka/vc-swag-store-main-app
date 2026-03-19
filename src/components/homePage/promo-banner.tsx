import { getPromotions } from "@/lib/promotion";

export async function PromoBanner() {
    const promoItem = await getPromotions();

    if (!promoItem || !promoItem.active) {
        return null; // No active promotion, or promo is not available, don't render the banner
    }

  return (
    <section className="bg-primary py-2 fixed w-full z-10">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-lg px-2 text-white mb-0">
            <span>{promoItem.title + ' - '}</span>
            <span>{promoItem.description}</span>
        </p>
      </div>
    </section>
  );
}

export function PromoBannerSkeleton() {
  return (
    <section className="bg-primary py-3 fixed w-full z-10 ">
      <div className="container mx-auto text-center animate-pulse w-1/2">
        <div className="h-4 bg-gray-300 mb-0"></div>
      </div>
    </section>
  );
}