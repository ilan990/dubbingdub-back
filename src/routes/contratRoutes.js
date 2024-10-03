const express = require('express');
const contratController = require('../controllers/contratController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

//Ajout d'un contrat doubleur
router.post('/', authenticateToken, contratController.addContrat);


module.exports = router;