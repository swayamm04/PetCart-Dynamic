"use client";

import { useEffect, useState } from "react";
import { ProductSlider } from "./ProductSlider";
import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function DealOfWeek() {
    const [deals, setDeals] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchDeals() {
            try {
                const res = await fetch(`${API_URL}/products`);
                if (res.ok) {
                    const data = await res.json();
                    // Simulate "Deals" by picking random or those with salePrice
                    const dealProducts = data
                        .filter((p: Product & { isDeal?: boolean }) => p.isDeal)
                        .map((p: Product & { _id?: string }) => ({
                            ...p,
                            id: p._id,
                            regularPrice: p.price,
                            discountPercentage: p.salePrice ? Math.round(((p.price - p.salePrice) / p.price) * 100) : 0
                        }));

                    setDeals(dealProducts.reverse().slice(0, 4));
                }
            } catch (e) {
                console.error("Failed to fetch deals", e);
            }
        }
        fetchDeals();
    }, []);

    if (deals.length === 0) return null;

    return (
        <ProductSlider
            title="Deal of the Week"
            products={deals}
        />
    );
}
