const pool = require('../config/database');
require('dotenv').config();

const Film = {
    create: async (filmData) => {
        const {
          titre,
          description,
          date_sortie,
          id_production,
          statut,
          image,
          duree,
          pays_origine,
          realisateur,
          scenaristes,
          genres,
          budget,
          nb_personnages_parlants,
          langue_originale,
          notes_critiques,
          lien_bande_annonce,
          date_limite_doublage
        } = filmData;
    
        const query = `
          INSERT INTO films (
            titre, description, date_sortie, id_production, statut, image,
            duree, pays_origine, realisateur, scenaristes, genres, budget,
            nb_personnages_parlants, langue_originale, notes_critiques,
            lien_bande_annonce, date_limite_doublage
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        const values = [
          titre,
          description,
          date_sortie,
          id_production,
          statut || 'en_vente',
          image,
          duree || null,
          pays_origine || null,
          realisateur || null,
          scenaristes || null,
          genres || null,
          budget || null,
          nb_personnages_parlants || null,
          langue_originale || null,
          notes_critiques || null,
          lien_bande_annonce || null,
          date_limite_doublage || null
        ];
    
        try {
          const [result] = await pool.query(query, values);
          return result.insertId;
        } catch (error) {
          console.error('Erreur lors de la création du film:', error);
          throw error;
        }
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