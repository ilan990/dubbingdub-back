const bcrypt = require('bcrypt');
const pool = require('../config/database');  // Assurez-vous que le chemin est correct

const authController = {
  register: async (req, res) => {
    try {
      const { nom, prenom, email, mot_de_passe, role } = req.body;

      // Vérification du rôle
      const validRoles = ['doubleur', 'directeur_artistique', 'maison_production', 'admin'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Rôle invalide. Choisissez entre 'doubleur', 'directeur_artistique' ou 'maison_production'." });
      }

      // Vérification si l'utilisateur existe déjà
      const [existingUsers] = await pool.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
      if (existingUsers.length > 0) {
        return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà" });
      }

      // Hashage du mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);

      // Insertion de l'utilisateur dans la base de données
      const [result] = await pool.query(
        'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
        [nom, prenom, email, hashedPassword, role]
      );

      // Si l'utilisateur est une maison de production, on l'ajoute également dans la table maisons_production
      if (role === 'maison_production') {
        await pool.query(
          'INSERT INTO maisons_production (id_utilisateur, nom) VALUES (?, ?)',
          [result.insertId, nom]
        );
      }

      res.status(201).json({ 
        message: "Utilisateur enregistré avec succès", 
        userId: result.insertId,
        role: role
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
    }
  },

  // Autres méthodes du contrôleur...
};

module.exports = authController;