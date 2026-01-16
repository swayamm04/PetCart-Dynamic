require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Banner = require('./models/Banner');

// Tester Data
const products = [
    {
        name: "Premium Dog Food",
        description: "High quality chicken and rice formula",
        price: 49.99,
        salePrice: 39.99,
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1623366302587-bcaaa9c23896?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Dogs",
        type: "Food",
        rating: 4.8,
        stock: 10,
        specifications: [
            { label: "Brand", value: "PremiumPet" },
            { label: "Flavor", value: "Chicken & Rice" },
            { label: "Weight", value: "5kg" }
        ]
    },
    {
        name: "Cat Scratching Post",
        description: "Durable sisal post for cats",
        price: 29.99,
        salePrice: 24.99,
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Cats",
        type: "Accessory",
        rating: 4.5,
        stock: 15,
        specifications: [
            { label: "Material", value: "Sisal" },
            { label: "Height", value: "24 inches" }
        ]
    },
    {
        name: "Pet Grooming Kit",
        description: "Complete set of brushes and clippers",
        price: 35.50,
        // No sale
        image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1522276498395-f4f68f7f8a9d?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Dogs",
        type: "Accessory",
        rating: 4.7,
        stock: 5,
        specifications: [
            { label: "Pieces", value: "5" },
            { label: "Usage", value: "Home Grooming" }
        ]
    },
    {
        name: "Bird Cage",
        description: "Spacious cage for parakeets",
        price: 120.00,
        salePrice: 99.00,
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1444464666117-26f58f479059?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1549421263-548545aaf278?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Birds",
        type: "Accessory",
        rating: 4.6,
        stock: 3,
        specifications: [
            { label: "Dimensions", value: "18x18x24" },
            { label: "Color", value: "White" }
        ]
    },
    {
        name: "Interactive Cat Toy",
        description: "Keep your cat entertained for hours with this interactive laser toy.",
        price: 19.99,
        salePrice: 14.99,
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Cats",
        type: "Accessory",
        rating: 4.5,
        stock: 20,
        specifications: [
            { label: "Battery", value: "AA" },
            { label: "Type", value: "Laser" }
        ]
    },
    {
        name: "Aquarium Filter 50G",
        description: "Powerful filter for aquariums up to 50 gallons.",
        price: 35.00,
        // No sale
        image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Fish",
        type: "Accessory",
        rating: 4.2,
        stock: 15,
        specifications: [
            { label: "Capacity", value: "50 Gallons" },
            { label: "Flow Rate", value: "200 GPH" }
        ]
    },
    {
        name: "Flea & Tick Prevention Chews",
        description: "Monthly flea and tick prevention for dogs. Vet recommended.",
        price: 34.99,
        salePrice: 29.99,
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Dogs",
        type: "Medicine",
        rating: 4.8,
        stock: 100,
        specifications: [
            { label: "Count", value: "30 Chews" },
            { label: "Active Ingredient", value: "Fipronil" }
        ]
    },
    {
        name: "Calming Chews for Cats",
        description: "Helps reduce anxiety in cats during travel or storms.",
        price: 24.99,
        salePrice: 19.99,
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Cats",
        type: "Medicine",
        rating: 4.4,
        stock: 50,
        specifications: [
            { label: "Count", value: "60 Chews" },
            { label: "Flavor", value: "Salmon" }
        ]
    }
];

const banners = [
    {
        title: "Pet Essentials",
        subtitle: "Delivered in 60 Mins*",
        description: "Genuine Supplies at Low Prices.",
        image: "/images/Banner/hero-banner-1.png",
        link: "/shop",
        bgColor: "#F5F5F5",
        textColor: "#1A1A1A",
        buttonColor: "#000000",
        isActive: true
    },
    {
        title: "Premium Food",
        subtitle: "For Your Furry Friends",
        description: "Healthy & Tasty Options Available.",
        image: "/images/Banner/hero-banner-2.png",
        link: "/shop/food",
        bgColor: "#EBEBEB",
        textColor: "#000000",
        buttonColor: "#333333",
        isActive: true
    },
    {
        title: "Toys & Gear",
        subtitle: "For Endless Fun",
        description: "Best Quality Accessories.",
        image: "/images/Banner/hero-banner-3.png",
        link: "/shop/toys",
        bgColor: "#FAFAFA",
        textColor: "#171717",
        buttonColor: "#000000",
        isActive: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        await Banner.deleteMany({});
        console.log('Cleared existing data.');

        // Insert new Products
        await Product.insertMany(products);
        console.log('Added Test Products.');

        // Insert Banners
        await Banner.insertMany(banners);
        console.log('Added Test Banners.');

        // Insert Test User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const adminUser = new User({
            name: "PetShop Admin",
            phone: "9876543210",
            password: hashedPassword,
            role: "admin",
            addresses: [{
                street: "123 Pet St",
                city: "Animville",
                state: "KA",
                zip: "560001",
                type: "Home"
            }]
        });

        await adminUser.save();
        console.log('Added Test User: 9876543210 / password123');

        console.log('Seeding Complete! press Ctrl+C to exit.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
