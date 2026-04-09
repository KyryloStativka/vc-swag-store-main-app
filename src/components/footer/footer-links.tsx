import Link from "next/link";
import { getStoreConfig } from "@/lib/store";  
import { Button } from "@/components/ui/button";

export async function FooterLinks() {
	const config = await getStoreConfig();
	return (
		<>
            {Object.keys(config?.socialLinks || {}).map((key) => {
                const socialLinks = config?.socialLinks || {};
                const link = socialLinks[key as keyof typeof socialLinks] || "#";

                return (
                    <Button variant="ghost" size="sm" asChild key={key}>
                        <Link href={link} target="_blank" rel="noopener noreferrer" className="capitalize">
                            {key}
                        </Link>
                    </Button>
                );
            })}
		</>
	)
}