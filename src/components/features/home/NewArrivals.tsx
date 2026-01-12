"use client";

import { ProductSlider } from "./ProductSlider";
import { products } from "@/data/products";

export function NewArrivals() {
    // For now, just taking the first 6 products as "New Arrivals"
    const newArrivals = products.slice(0, 6);

    return (
        <ProductSlider
            title="New Arrivals"
            products={newArrivals}
        />
    );
}
