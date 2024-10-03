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
  }
};

module.exports = Contrat;