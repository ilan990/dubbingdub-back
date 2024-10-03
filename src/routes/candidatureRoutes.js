const express = require('express');
const candidatureController = require('../controllers/candidatureController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

//Candidature pour DA
router.get('/', authenticateToken, candidatureController.getCandidatures);

// Modification d'une candidature
router.put('/:id', authenticateToken, candidatureController.updateCandidature);

module.exports = router;