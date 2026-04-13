import type { Category } from "@/lib/types";
import Link from "next/link";
import { CloseIcon } from "@/components/customIcons/closeIcon";

export function CategorySidebar({ categories, currentCategory }: { categories: Category[], currentCategory?: string }) {


    return (
        <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded ">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            {currentCategory && (
                <h3 className="mb-2">Selected: <span className="uppercase ml-2 font-bold bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mr-2 mb-2">{currentCategory || "None"}</span></h3>
            )}
            <ul className="max-h-[170px] sm:max-h-full overflow-scroll bg-white p-2 rounded">
                {categories.map((category) => (
                    <li key={category.name} className="mb-1">
                        <Link href={currentCategory === category.slug ? "/search" : `/search?category=${category.slug}`} className={`text-primary w-full flex justify-between items-center hover:underline ${currentCategory === category.slug ? 'font-bold italic' : ''}`}>
                            {category.name}
                            <span>
                                {currentCategory === category.slug && <CloseIcon className="inline-block ml-auto size-4 text-gray-500" />}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}