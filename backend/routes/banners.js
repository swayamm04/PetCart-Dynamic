const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');

// @route   GET /api/banners
// @desc    Get all banners
router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find({});
        res.json(banners);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route   POST /api/banners
// @desc    Add a banner
router.post('/', async (req, res) => {
    try {
        const banner = new Banner(req.body);
        await banner.save();
        res.status(201).json(banner);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err.message });
    }
});

// @route   DELETE /api/banners/:id
// @desc    Delete a banner
router.delete('/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            await Banner.deleteOne({ _id: req.params.id });
            res.json({ message: 'Banner removed' });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
