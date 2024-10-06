// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');


const router = express.Router();

router.post('/register', authController.register);
router.post('/login',authController.login)
router.post('/logout', authenticateToken, authController.logout);
router.get('/me', authenticateToken, authController.getUserInfo);
router.put('/profil', authenticateToken, authController.updateProfile);
router.get('/verify', authController.verifyToken);

module.exports = router;
