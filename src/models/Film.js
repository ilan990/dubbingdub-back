const pool = require('../config/database');
require('dotenv').config();

const Film = {
  create: async (filmData) => {
    const columns = Object.keys(filmData).join(', ');
    const placeholders = Object.keys(filmData).map(() => '?').join(', ');
    const values = Object.values(filmData);

    const query = `
      INSERT INTO films (${columns})
      VALUES (${placeholders})
    `;

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error('Erreur lors de la création du film:', error);
      throw error;
    }
  },


  getMovies: async (user) => {
      let rows;
          
      if (user.role == process.env.user_production) {
        [rows] = await pool.query('SELECT * FROM films WHERE supprime = 0 AND id_production = ?', [user.userId]);
      } else if (user.role == process.env.user_DA) {
        [rows] = await pool.query(
          `SELECT f.*, fd.id_da
            FROM films f
            LEFT JOIN film_da fd ON f.id = fd.id_film
            WHERE supprime = 0 AND fd.id_da = ? OR fd.id_da is NULL
            ORDER BY f.id`,
          [user.userId]
        );
      } else {
        throw new Error('Rôle utilisateur non reconnu');
      }
      return [rows][0]
  },

  findById: async (id) => {
      try {
        const [rows] = await pool.query('SELECT * FROM films WHERE id = ?', [id]);
        return rows[0];
      } catch (error) {
        console.error('Erreur dans le modèle lors de la récupération du film:', error);
        throw error;
      }
  },

  getProductionByMovie: async (filmId) => {
    try {
      const [rows] = await pool.query('SELECT id_production FROM films WHERE id = ?', [filmId]);
      return rows[0].id_production;
    } catch (error) {
      console.error('Erreur dans le modèle lors de la récupération de la maison de production du film:', error);
      throw error;
    }
  },

  createRole: async (roleData) => {
    const columns = Object.keys(roleData).join(', ');
    const placeholders = Object.keys(roleData).map(() => '?').join(', ');
    const values = Object.values(roleData);

    const query = `
      INSERT INTO roles (${columns})
      VALUES (${placeholders})
    `;

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error('Erreur lors de la création du film:', error);
      throw error;
    }
  },
  
  getRolesByIdMovie: async (filmId) => {
    try {
      const [rows] = await pool.query('SELECT nom_personnage, acteur_original, age_approximatif,nombre_mots,nombre_mots FROM roles WHERE id = ?', [filmId]);
      return rows[0];
    } catch (error) {
      console.error('Erreur dans le modèle lors de la récupération de la maison de production du film:', error);
      throw error;
    }
  },

  updateMovie: async (filmData) => {
    const { id_film, ...updateFields } = filmData;
  
    const fields = Object.keys(updateFields);
    const values = Object.values(updateFields);
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE films SET ${setClause} WHERE id = ?`;
    
    values.push(id_film);
    
    const [result] = await pool.query(query, values);
    
    return result.affectedRows > 0;
  },

  
  deleteMovie: async (id_film) => {
  
    const query = `UPDATE films SET supprime = 1 WHERE id = ?`;
   
    const [result] = await pool.query(query, id_film);
    
    return result.affectedRows > 0;
  },

  candidatureDA: async(candidatureData) => {
    
    const columns = Object.keys(candidatureData).join(', ');
    const placeholders = Object.keys(candidatureData).map(() => '?').join(', ');
    const values = Object.values(candidatureData);

    const query = `
      INSERT INTO candidatures_da (${columns})
      VALUES (${placeholders})
    `;

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error('Erreur lors de la création du film:', error);
      throw error;
    }

  }
};

module.exports = Film;