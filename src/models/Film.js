const pool = require('../config/database');

const Film = {
    create: async ({ titre, description, date_sortie, id_production, statut, image }) => {
      const [result] = await pool.query(
        'INSERT INTO films (titre, description, date_sortie, id_production, statut, image) VALUES (?, ?, ?, ?, ?, ?)',
        [titre, description, date_sortie, id_production, statut, image]
      );
      return result.insertId;
    },
  };

module.exports = Film;