const express = require('express');
const candidatureController = require('../controllers/candidatureController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

//Candidature pour DA
router.get('/', authenticateToken, candidatureController.getCandidatures);

module.exports = router;