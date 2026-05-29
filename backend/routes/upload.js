const express = require('express');
const router = express.Router();
const multer = require('multer');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../utils/s3Config');
const path = require('path');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    },
});

// @route   POST /api/upload
// @desc    Upload an image to R2
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
        const uploadParams = {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        const fileUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

        res.status(200).json({
            message: 'Upload successful',
            url: fileUrl,
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
