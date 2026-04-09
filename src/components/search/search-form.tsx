'use client';

import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";


export function SearchForm({ initQuery = "" }: { initQuery?: string }) {
    const [query, setQuery] = useState(initQuery);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Only sync from URL when navigating back/forward or external URL change
    useEffect(() => {
        setQuery(searchParams.get("query") || "");
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0 && value.length < 3) return;
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            startTransition(() => {
                const params = new URLSearchParams(searchParams.toString());

                if (value) {
                    params.set("query", value);
                } else {
                    params.delete("query");
                }

                router.replace(`/search?${params.toString()}`);
                });
            }, 300);
        };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

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
                min={3}
                minLength={3}
                onChange={handleChange}
                placeholder="Search products..."
            />
            <Button type="submit" className="py-3 px-6"  disabled={query.trim().length < 3 || isPending}>
                {isPending ? <Spinner /> : "Search"}
            </Button>
        </form>
    );
}