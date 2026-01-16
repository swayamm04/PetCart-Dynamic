const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    link: { type: String, default: '/shop' },
    bgColor: { type: String, default: '#F5F5F5' },
    textColor: { type: String, default: '#000000' },
    buttonColor: { type: String, default: '#000000' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Banner', bannerSchema);
