const pool = require('../config/database');
require('dotenv').config();

const Contrat = {
  create: async (contratData) => {
    const columns = Object.keys(contratData).join(', ');
    const placeholders = Object.keys(contratData).map(() => '?').join(', ');
    const values = Object.values(contratData);

    const query = `
      INSERT INTO contrats (${columns})
      VALUES (${placeholders})
    `;

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error('Erreur lors de la création du contrat:', error);
      throw error;
    }
  },

  getContrats: async (user) => {
    let rows;
        
    if (user.role == process.env.user_DA) {
      [rows] = await pool.query('SELECT c.* FROM contrats c INNER JOIN film_da fd ON fd.id_film = c.id_film WHERE id_da = ?', [user.userId]);
    } else {
      throw new Error('Rôle utilisateur non reconnu');
    }
    return [rows][0]
},
};

module.exports = Contrat;