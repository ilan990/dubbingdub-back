const pool = require('../config/database');
const { updateCandidature } = require('../controllers/candidatureController');

const Candidature = {
    getCandidaturesByIdProd: async (userId) => {
    const [rows] = await pool.query(
        `SELECT c.* FROM candidatures_da c
            INNER JOIN films f ON f.id = c.id_film
            WHERE f.id_production = ?`, [userId]);
    return rows[0];
  },

  getDaByIdCandidature: async (candidatureId) => {
    const [rows] = await pool.query(
        `SELECT c.id_da FROM candidatures_da c
            WHERE id = ?`, [candidatureId]);
    return rows[0].id_da;
  },

  updateCandidature: async (candidatureData) => {
    const { id_candidature, ...updateFields } = candidatureData;
  
    const fields = Object.keys(updateFields);
    const values = Object.values(updateFields);
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE candidatures_da SET ${setClause} WHERE id = ?`;
    
    values.push(id_candidature);
    
    const [result] = await pool.query(query, values);
    
    return result.affectedRows > 0;
  },

};

module.exports = Candidature;