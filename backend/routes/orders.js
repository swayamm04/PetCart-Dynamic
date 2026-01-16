const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// @route   POST /api/orders
// @desc    Create new order
router.post('/', async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        } else {
            const order = new Order({
                // Map frontend 'orderItems' to backend 'items'
                items: orderItems,
                user: user ? user._id : null,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                // Map frontend 'totalPrice' to backend 'totalAmount'
                totalAmount: totalPrice
            });

            // Update Stock
            // Product is already imported at the top
            for (const item of orderItems) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock = product.stock - item.quantity;
                    await product.save();
                }
            }

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   GET /api/orders/myorders/:userId
// @desc    Get logged in user orders
router.get('/myorders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
            .populate('items.product', 'name image price') // Populate product details
            .sort({ createdAt: -1 }); // Newest first
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   GET /api/orders
// @desc    Get all orders
// @route   GET /api/orders
// @desc    Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'id name email')
            .populate('items.product', 'name image price') // Populate product details
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('items.product', 'name image price');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
// @desc    Update order status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            // Restore stock if order is cancelled
            if (status === 'Cancelled' && order.status !== 'Cancelled') {
                console.log(`[Order Update] Cancelling Order ${order._id}. Restoring stock...`);
                for (const item of order.items) {
                    const productId = item.product._id || item.product;
                    const qty = Number(item.quantity);

                    if (productId && qty > 0) {
                        await Product.findByIdAndUpdate(productId, {
                            $inc: { stock: qty }
                        });
                    }
                }
            }

            order.status = status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
