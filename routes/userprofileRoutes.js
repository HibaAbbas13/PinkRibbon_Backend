const express = require('express');
const router = express.Router();
const UserProfileController = require('../controllers/userprofileController.js');
const checkUserAuth = require('../middlewares/auth-middleware.js');

// Apply middleware for all routes in this file
router.use(checkUserAuth);

// Define route handlers
router.get('/', async (req, res) => {
    try {
        // Call the controller method to handle the request
        const userProfile = await UserProfileController.getCurrentUserProfile(req.user);
        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/profile', async (req, res) => {
    try {
        // Call the controller method to handle the request
        const updatedProfile = await UserProfileController.updateCurrentUserProfile(req.user, req.body);
        res.json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
