import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-2">Ooops! Something went wrong.</p>
            <p className="text-lg text-gray-700 mb-6">
                The page you are looking for does not exist. It might have been removed or is temporarily unavailable.
            </p>
            <Link href="/">
                <Button variant="default" size="lg">
                    Go Back Home
                </Button>
            </Link>
        </div>
    );
}