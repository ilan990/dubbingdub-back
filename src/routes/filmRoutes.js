const express = require('express');
const filmController = require('../controllers/filmController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Ajout d'un film
router.post('/', authenticateToken, filmController.addMovie);

// Récupération d'un film
router.get('/', authenticateToken, filmController.getMovie);

// Recupération des infos du film
router.get('/:id', authenticateToken, filmController.getFilmById);

module.exports = router;