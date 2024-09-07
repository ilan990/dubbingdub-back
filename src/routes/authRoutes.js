const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');


const router = express.Router();

router.post('/register', authController.register);
router.post('/login',authController.login)
router.post('/logout', authenticateToken, authController.logout);


module.exports = router;
