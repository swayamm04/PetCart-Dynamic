const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret (Should be in .env, using simple one for dev)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            name,
            phone,
            password: hashedPassword
        });

        await user.save();

        // Create Token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Check user
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create Token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, phone: user.phone, role: user.role, addresses: user.addresses }
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   POST /api/auth/check-user
// @desc    Check if user exists by phone
router.post('/check-user', async (req, res) => {
    try {
        const { phone } = req.body;
        const user = await User.findOne({ phone });
        res.json({ exists: !!user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   POST /api/auth/admin-update-password
// @desc    Update admin password
router.post('/admin-update-password', async (req, res) => {
    try {
        const { phone, currentPassword, newPassword } = req.body;

        // 1. Find user by phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User with this phone number not found' });
        }

        // 2. Verify Role (Optional but good safety)
        if (user.role !== 'Admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // 3. Verify Current Password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // 4. Hash New Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ success: true, message: 'Password updated successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   POST /api/auth/change-password
// @desc    Change user password
router.post('/change-password', async (req, res) => {
    try {
        const { phone, currentPassword, newPassword } = req.body;

        // 1. Find user by phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User with this phone number not found' });
        }

        // 2. Verify Current Password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // 3. Hash New Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ success: true, message: 'Password updated successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
router.put('/profile', async (req, res) => {
    try {
        const { id, name } = req.body;

        // Find user
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (name) user.name = name;

        await user.save();

        res.json({
            success: true,
            user: { id: user._id, name: user.name, phone: user.phone, role: user.role, addresses: user.addresses }
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   POST /api/auth/reset-password
// @desc    Reset user password
router.post('/reset-password', async (req, res) => {
    try {
        const { phone, newPassword } = req.body;

        // Find user by phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User with this phone number not found' });
        }

        // Hash New Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ success: true, message: 'Password reset successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
