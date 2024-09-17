const pool = require('../config/database');

const Candidature = {
    getCandidaturesByIdProd: async (userId) => {
    const [rows] = await pool.query(
        `SELECT c.* FROM candidatures_da c
            INNER JOIN films f ON f.id = c.id_film
            WHERE f.id_production = ?`, [userId]);
    return rows[0];
  },

};

module.exports = Candidature;