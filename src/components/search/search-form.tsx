'use client';

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "../ui/spinner";

export function SearchForm({ initQuery = "" }: { initQuery?: string }) {
    const [query, setQuery] = useState(initQuery);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Only sync from URL when navigating back/forward or external URL change
    useEffect(() => {
        setQuery(searchParams.get("query") || "");
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setQuery(value); // ← update display immediately on every keystroke

        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set("query", value);
            } else {
                params.delete("query");
            }

            router.replace(`/search?${params.toString()}`);
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query.trim()) {
                params.set("query", query.trim());
            } else {
                params.delete("query");
            }
            router.replace(`/search?${params.toString()}`);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex max-w-[450px] items-center gap-2 m-auto">
            <Input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search products..."
            />
            <Button type="submit" className="py-3 px-6"  disabled={!query.trim() || isPending}>
                {isPending ? <Spinner /> : "Search"}
            </Button>
        </form>
    );
}