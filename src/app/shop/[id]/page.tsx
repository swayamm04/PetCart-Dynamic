"use client";

import { use } from "react";
import { ProductDetails } from "@/components/features/shop/ProductDetails";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <ProductDetails id={id} />;
}
