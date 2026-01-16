"use client";

import { useEffect, useState } from "react";
import { ProductSlider } from "./ProductSlider";
import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function NewArrivals() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`${API_URL}/products`);
                if (res.ok) {
                    const data = await res.json();

                    // Map MongoDB _id to id if needed by components, or just use data
                    // For now, assuming components can handle _id or we map it
                    // Sort by newest first (assuming API returns chronological) -> Reverse
                    // And increase limit for slider
                    const mappedProducts = data.reverse().slice(0, 10).map((p: Product & { _id?: string }) => ({
                        ...p,
                        id: p._id,
                        regularPrice: p.price,
                        discountPercentage: p.salePrice ? Math.round(((p.price - p.salePrice) / p.price) * 100) : 0
                    }));

                    setProducts(mappedProducts);
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
