const pool = require('../config/database');
require('dotenv').config();

const Film = {
    create: async ({ titre, description, date_sortie, id_production, statut, image }) => {
      const [result] = await pool.query(
        'INSERT INTO films (titre, description, date_sortie, id_production, statut, image) VALUES (?, ?, ?, ?, ?, ?)',
        [titre, description, date_sortie, id_production, statut, image]
      );
      return result.insertId;
    },

    getMovies: async (user) => {
        console.log(user);
        let rows;
           
        if (user.role == process.env.user_production) {
          [rows] = await pool.query('SELECT * FROM films WHERE id_production = ?', [user.userId]);
        } else if (user.role == process.env.user_DA) {
          [rows] = await pool.query(
            `SELECT f.*, fd.id_da
             FROM films f
             LEFT JOIN film_da fd ON f.id = fd.id_film
             WHERE fd.id_da = ? OR fd.id_da is NULL
             ORDER BY f.id`,
            [user.userId]
          );
        } else {
          throw new Error('Rôle utilisateur non reconnu');
        }
        return [rows][0]
    },
};

module.exports = Film;