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

};

module.exports = User;