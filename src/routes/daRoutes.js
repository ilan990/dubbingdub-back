const express = require('express');
const daController = require('../controllers/daController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

//Candidature pour DA
router.post('/:id/candidature', authenticateToken, daController.candidatureDA);

module.exports = router;