"use client";

import { useEffect, useState } from "react";
import { ProductSlider } from "./ProductSlider";
import { Product } from "@/data/products";

export function NewArrivals() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data.slice(0, 6)); // Just take first 6 for now
                }
            } catch (e) {
                console.error("Failed to fetch products", e);
            }
        }
        fetchProducts();
    }, []);

    if (products.length === 0) return null;

    return (
        <ProductSlider
            title="New Arrivals"
            products={products}
        />
    );
}
