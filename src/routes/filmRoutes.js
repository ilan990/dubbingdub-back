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

// Ajout d'un rôle dans un film
router.post('/:id/role', authenticateToken, filmController.addRole);

// Récupération des roles d'un film
router.get('/:id/role', authenticateToken, filmController.getRolesByIdMovie);

// Modification d'un film
router.put('/:id', authenticateToken, filmController.updateMovie);

//Suppression d'un film
router.delete('/:id', authenticateToken, filmController.deleteMovie);

//Candidature pour DA
router.post('/:id/candidature', authenticateToken, filmController.candidatureDA);

module.exports = router;