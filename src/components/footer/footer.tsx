
import { Suspense } from "react";
import { FooterLinks } from "@/components/footer/footer-links";
import { CurrentYear } from "@/components/footer/footer-copy-right";

export function Footer() {
	return (
		<footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 items-center justify-between px-8 sm:px-6 lg:px-0">
				<span className="text-sm text-muted-foreground">
                    <Suspense fallback={<span className="inline-block h-4 w-8 bg-muted/50 rounded" />}>
                        <CurrentYear /> 
                    </Suspense>
				</span>
				<nav className="flex items-center gap-1">
					<Suspense fallback={<div className="flex items-center gap-1"><span className="inline-block h-4 w-8 bg-muted/50 rounded" /><span className="inline-block h-4 w-8 bg-muted/50 rounded" /><span className="inline-block h-4 w-8 bg-muted/50 rounded" /></div>}>
						<FooterLinks />
					</Suspense>
				</nav>
			</div>
		</footer>
	);
}
