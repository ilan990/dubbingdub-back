const express = require('express');
const filmController = require('../controllers/filmController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticateToken, filmController.addMovie);
router.get('/', authenticateToken, filmController.getMovie);

module.exports = router;