const pool = require('../config/database');

const User = {
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
    return rows[0];
  },

  create: async (userData) => {
    const { nom, prenom, email, mot_de_passe, role } = userData;
    const [result] = await pool.query(
      'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, email, mot_de_passe, role]
    );
    return result.insertId;
  },

  createProductionCompany: async (userId, companyName) => {
    await pool.query(
      'INSERT INTO maisons_production (id_utilisateur, nom) VALUES (?, ?)',
      [userId, companyName]
    );
  },
  update: async (userId, userData) => {
    const { nom, prenom, email } = userData;
    const [result] = await pool.query(
      'UPDATE utilisateurs SET nom = ?, prenom = ?, email = ? WHERE id = ?',
      [nom, prenom, email, userId]
    );
    return result.affectedRows > 0;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM utilisateurs WHERE id = ?', [id]);
    return rows[0];
  },
  
  getProductionIdByUserId: async (userId) => {
    const [rows] = await pool.query(
      'SELECT id FROM maisons_production WHERE id_utilisateur = ?',
      [userId]
    );
    return rows[0] ? rows[0].id : null;
  },

};

module.exports = User;