const express =require( 'express');
const router = express.Router();
const UserController =require( '../controllers/userController.js');
const authMiddleware =require( '../middlewares/auth-middleware.js');
const { uploadProfileImage } = require('../config/upload.js');
router.use('/changepassword', authMiddleware.checkUserAuth)
router.use('/loggeduser', authMiddleware.checkUserAuth)

// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/update', uploadProfileImage ,UserController.updateUserInfo)
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

router.post('/changepassword', UserController.changeUserPassword)
router.post('/logout', UserController.userLogout);
// Get current user profile

router.get('/users', UserController.getUsers);

module.exports=router