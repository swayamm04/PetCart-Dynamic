const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    salePrice: Number,
    image: String,
    images: [String],
    category: {
        type: String,
        required: true,
        // enum: ['Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets'] // Optional validation
    },
    type: {
        type: String,
        required: true,
        enum: ['Food', 'Accessory', 'Medicine', 'Toys', 'Grooming'] // Expanded to include Seed data types if needed, or map them
    },
    stock: {
        type: Number,
        default: 100
    },
    rating: {
        type: Number,
        default: 4.5
    },
    specifications: [{
        label: String,
        value: String
    }],
    isDeal: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
