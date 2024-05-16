const express = require('express');
const router = express.Router();
const UserProfileController = require('../controllers/userprofileController.js');
const checkUserAuth = require('../middlewares/auth-middleware.js');

// Apply middleware for all routes in this file
router.use(checkUserAuth);
router.get('/', UserProfileController.getCurrentUserProfile);
router.put('/profile', UserProfileController.updateCurrentUserProfile);

module.exports = router;
