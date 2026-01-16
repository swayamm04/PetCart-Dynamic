export interface Product {
    _id: string; // MongoDB ID
    id: string; // Frontend ID (mapped from _id)
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    regularPrice?: number; // Mapped from price
    image: string;
    images?: string[];
    category: string;
    stock: number;
    rating: number;
    type?: string;
    discountPercentage?: number;
    inStock?: boolean;
    specifications?: { label: string; value: string; }[];
}
