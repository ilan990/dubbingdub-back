const pool = require('../config/database');

const Film = {
  create: async ({ titre, description, date_sortie, id_production, statut }) => {
    const [result] = await pool.query(
      'INSERT INTO films (titre, description, date_sortie, id_production, statut) VALUES (?, ?, ?, ?, ?)',
      [titre, description, date_sortie, id_production, statut]
    );
    return result.insertId;
  },
};

module.exports = Film;