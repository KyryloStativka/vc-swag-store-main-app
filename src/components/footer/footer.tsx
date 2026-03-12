import Link from "next/link";
import { Button } from "../ui/button";

export function Footer() {
	return (
		<footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<span className="text-sm text-muted-foreground">
					Swag Store. All rights reserved.
				</span>
				<nav className="flex items-center gap-1">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/about">About</Link>
					</Button>
					<Button variant="ghost" size="sm" asChild>
						<Link href="/contact">Contact</Link>
					</Button>
					<Button variant="ghost" size="sm" asChild>
						<Link href="/privacy">Privacy Policy</Link>
					</Button>
				</nav>
			</div>
		</footer>
	);
}
