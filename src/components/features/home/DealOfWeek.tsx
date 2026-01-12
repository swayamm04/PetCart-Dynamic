"use client";

import { ProductSlider } from "./ProductSlider";
import { products } from "@/data/products";

export function DealOfWeek() {
    // Filtering products that have a discount
    const deals = products.filter(p => p.discountPercentage > 0);

    return (
        <ProductSlider
            title="Deal of the Week"
            products={deals}
        />
    );
}
