import { Product } from "@/types/product";

export const products: Product[] = [
    {
        _id: "1",
        id: "1",
        name: "Premium Dog Food - Chicken & Rice",
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60", // Main
            "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=500&auto=format&fit=crop&q=60", // Dog eating
            "https://images.unsplash.com/photo-1623366302587-bcaaa9c23896?w=500&auto=format&fit=crop&q=60"  // Dog happy
        ],
        price: 49.99,
        regularPrice: 49.99,
        salePrice: 39.99,
        discountPercentage: 20,
        category: "Dogs",
        type: "Food",
        description: "High-quality dry dog food with real chicken and rice. Supports healthy digestion.",
        inStock: true,
        stock: 50,
        rating: 4.8,
        specifications: [
            { label: "Brand", value: "Petzy Premium" },
            { label: "Breed Size", value: "All Breeds" },
            { label: "Life Stage", value: "Adult" },
            { label: "Material", value: "Organic Ingredients" },
            { label: "Country", value: "USA" },
            { label: "Return Policy", value: "Non-Returnable" }
        ]
    },
    {
        _id: "2",
        id: "2",
        name: "Interactive Cat Toy",
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
        price: 19.99,
        regularPrice: 19.99,
        salePrice: 14.99,
        discountPercentage: 25,
        category: "Cats",
        type: "Accessory",
        description: "Keep your cat entertained for hours with this interactive laser toy.",
        inStock: true,
        stock: 20,
        rating: 4.5,
        specifications: [
            { label: "Brand", value: "MeowTech" },
            { label: "Breed Size", value: "All Breeds" },
            { label: "Life Stage", value: "All Ages" },
            { label: "Material", value: "Plastic / Electronics" },
            { label: "Country", value: "China" },
            { label: "Return Policy", value: "30 Days Return" }
        ]
    },
    {
        _id: "3",
        id: "3",
        name: "Large Bird Cage",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=60",
        price: 120.00,
        regularPrice: 120.00,
        salePrice: 99.00,
        discountPercentage: 17,
        category: "Birds",
        type: "Accessory",
        description: "Spacious cage for parrots and large birds. Easy to clean.",
        inStock: true,
        stock: 5,
        rating: 4.9,
        specifications: [
            { label: "Brand", value: "AvianHome" },
            { label: "Breed Size", value: "Large Birds" },
            { label: "Life Stage", value: "All Ages" },
            { label: "Material", value: "Stainless Steel" },
            { label: "Country", value: "Germany" },
            { label: "Return Policy", value: "15 Days Return" }
        ]
    },
    {
        _id: "4",
        id: "4",
        name: "Aquarium Filter 50G",
        image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60",
        price: 35.00,
        regularPrice: 35.00,
        salePrice: 35.00,
        discountPercentage: 0,
        category: "Fish",
        type: "Accessory",
        description: "Powerful filter for aquariums up to 50 gallons.",
        inStock: true,
        stock: 15,
        rating: 4.2,
        specifications: [
            { label: "Brand", value: "AquaPure" },
            { label: "Breed Size", value: "N/A" },
            { label: "Life Stage", value: "N/A" },
            { label: "Material", value: "Plastic / Filter Media" },
            { label: "Country", value: "Japan" },
            { label: "Return Policy", value: "30 Days Return" }
        ]
    },
    {
        _id: "5",
        id: "5",
        name: "Soft Dog Bed",
        image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=500&auto=format&fit=crop&q=60",
        price: 59.99,
        regularPrice: 59.99,
        salePrice: 45.00,
        discountPercentage: 25,
        category: "Dogs",
        type: "Accessory",
        description: "Orthopedic memory foam bed for dogs of all sizes.",
        inStock: true,
        stock: 10,
        rating: 4.7,
        specifications: [
            { label: "Brand", value: "ComfyPaws" },
            { label: "Breed Size", value: "Large / Medium" },
            { label: "Life Stage", value: "All Ages" },
            { label: "Material", value: "Memory Foam / Plush" },
            { label: "Country", value: "India" },
            { label: "Return Policy", value: "7 Days Return" }
        ]
    },
    {
        _id: "6",
        id: "6",
        name: "Cat Scratching Post",
        image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500&auto=format&fit=crop&q=60",
        price: 29.99,
        regularPrice: 29.99,
        salePrice: 24.99,
        discountPercentage: 16,
        category: "Cats",
        type: "Accessory",
        description: "Durable sisal scratching post to save your furniture.",
        inStock: true,
        stock: 25,
        rating: 4.6,
        specifications: [
            { label: "Brand", value: "ScratchMaster" },
            { label: "Breed Size", value: "All Breeds" },
            { label: "Life Stage", value: "Kitten / Adult" },
            { label: "Material", value: "Sisal / Wood" },
            { label: "Country", value: "Vietnam" },
            { label: "Return Policy", value: "Non-Returnable" }
        ]
    },
    {
        _id: "7",
        id: "7",
        name: "Flea & Tick Prevention Chews",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=60",
        price: 34.99,
        regularPrice: 34.99,
        salePrice: 29.99,
        discountPercentage: 14,
        category: "Dogs",
        type: "Medicine",
        description: "Monthly flea and tick prevention for dogs. Vet recommended.",
        inStock: true,
        stock: 100,
        rating: 4.8,
        specifications: [
            { label: "Brand", value: "VetGuard" },
            { label: "Breed Size", value: "All Breeds" },
            { label: "Life Stage", value: "Puppy / Adult" },
            { label: "Material", value: "Medicinal Chew" },
            { label: "Country", value: "USA" },
            { label: "Return Policy", value: "Non-Returnable" }
        ]
    },
    {
        _id: "8",
        id: "8",
        name: "Calming Chews for Cats",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60",
        price: 24.99,
        regularPrice: 24.99,
        salePrice: 19.99,
        discountPercentage: 20,
        category: "Cats",
        type: "Medicine",
        description: "Helps reduce anxiety in cats during travel or storms.",
        inStock: true,
        stock: 50,
        rating: 4.4,
        specifications: [
            { label: "Brand", value: "PurrCalm" },
            { label: "Breed Size", value: "All Breeds" },
            { label: "Life Stage", value: "All Ages" },
            { label: "Material", value: "Medicinal Chew" },
            { label: "Country", value: "UK" },
            { label: "Return Policy", value: "Non-Returnable" }
        ]
    }
];
