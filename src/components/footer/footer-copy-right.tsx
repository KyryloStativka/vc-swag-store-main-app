'use client';

import { useState,useEffect } from "react";


// maybe need to be move to server component
export function CurrentYear() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        const now = new Date();
        setYear(now.getFullYear());
    }, []);

    return <span><span>{year}</span> Swag Store. All rights reserved.</span>;
}
