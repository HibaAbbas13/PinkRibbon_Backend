const express = require('express');
const router = express.Router();
const Video = require('../models/Video.js'); // Ensure this path is correct

// Endpoint to add a video
router.post('/videos', async (req, res) => {
    try {
        const video = new Video(req.body);
        const savedVideo = await video.save();
        res.status(201).send(savedVideo);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to delete a video
router.delete('/videos/:id', async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).send();
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to get all videos
router.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).send(videos);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
