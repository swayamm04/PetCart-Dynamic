export interface Product {
    id: string;
    name: string;
    image: string;
    regularPrice: number;
    salePrice: number;
    discountPercentage: number;
    category: string;
    type: 'Food' | 'Accessory' | 'Medicine';
    description: string;
    inStock: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Premium Dog Food - Chicken & Rice",
        image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=500&auto=format&fit=crop&q=60",
        regularPrice: 49.99,
        salePrice: 39.99,
        discountPercentage: 20,
        category: "Dogs",
        type: "Food",
        description: "High-quality dry dog food with real chicken and rice. Supports healthy digestion.",
        inStock: true,
    },
    {
        id: "2",
        name: "Interactive Cat Toy",
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
        regularPrice: 19.99,
        salePrice: 14.99,
        discountPercentage: 25,
        category: "Cats",
        type: "Accessory",
        description: "Keep your cat entertained for hours with this interactive laser toy.",
        inStock: true,
    },
    {
        id: "3",
        name: "Large Bird Cage",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=60",
        regularPrice: 120.00,
        salePrice: 99.00,
        discountPercentage: 17,
        category: "Birds",
        type: "Accessory",
        description: "Spacious cage for parrots and large birds. Easy to clean.",
        inStock: true,
    },
    {
        id: "4",
        name: "Aquarium Filter 50G",
        image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60",
        regularPrice: 35.00,
        salePrice: 35.00,
        discountPercentage: 0,
        category: "Fish",
        type: "Accessory",
        description: "Powerful filter for aquariums up to 50 gallons.",
        inStock: true,
    },
    {
        id: "5",
        name: "Soft Dog Bed",
        image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=500&auto=format&fit=crop&q=60",
        regularPrice: 59.99,
        salePrice: 45.00,
        discountPercentage: 25,
        category: "Dogs",
        type: "Accessory",
        description: "Orthopedic memory foam bed for dogs of all sizes.",
        inStock: true,
    },
    {
        id: "6",
        name: "Cat Scratching Post",
        image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500&auto=format&fit=crop&q=60",
        regularPrice: 29.99,
        salePrice: 24.99,
        discountPercentage: 16,
        category: "Cats",
        type: "Accessory",
        description: "Durable sisal scratching post to save your furniture.",
        inStock: true,
    },
    {
        id: "7",
        name: "Flea & Tick Prevention Chews",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=60",
        regularPrice: 34.99,
        salePrice: 29.99,
        discountPercentage: 14,
        category: "Dogs",
        type: "Medicine",
        description: "Monthly flea and tick prevention for dogs. Vet recommended.",
        inStock: true,
    },
    {
        id: "8",
        name: "Calming Chews for Cats",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60",
        regularPrice: 24.99,
        salePrice: 19.99,
        discountPercentage: 20,
        category: "Cats",
        type: "Medicine",
        description: "Helps reduce anxiety in cats during travel or storms.",
        inStock: true,
    }
];
