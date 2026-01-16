const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        console.log('--- Attempting to create product with stock: 4 ---');
        const lowStockProduct = new Product({
            name: "Debug Low Stock Item",
            description: "Test description",
            price: 50,
            category: "Dogs",
            type: "Food",
            stock: 4, // Explicitly 4
            image: "test.jpg"
        });

        const savedLow = await lowStockProduct.save();
        console.log('Saved Product Stock:', savedLow.stock);
        console.log('Full Document:', savedLow);

        console.log('--- Attempting to create product with stock: 3 ---');
        const product3 = new Product({
            name: "Debug Stock 3",
            description: "Test 3",
            price: 50,
            category: "Dogs",
            type: "Food",
            stock: 3,
            image: "test.jpg"
        });
        const saved3 = await product3.save();
        console.log('Saved Product Stock (3):', saved3.stock);

        // Cleanup
        await Product.deleteOne({ _id: savedLow._id });
        await Product.deleteOne({ _id: saved3._id });
        console.log('Cleanup complete');

        process.exit(0);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
};

run();
