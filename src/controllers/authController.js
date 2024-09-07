const bcrypt = require('bcrypt');
const User = require('../models/user');

const authController = {
  register: async (req, res) => {
    try {
      const { nom, prenom, email, mot_de_passe, role } = req.body;

      // Vérification du rôle
      const validRoles = ['doubleur', 'directeur_artistique', 'maison_production', 'admin'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Rôle invalide." });
      }

      // Vérification si l'utilisateur existe déjà
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà" });
      }

      // Hashage du mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);

      // Création de l'utilisateur
      const userId = await User.create({ nom, prenom, email, mot_de_passe: hashedPassword, role });

      // Si l'utilisateur est une maison de production, on l'ajoute également dans la table maisons_production
      if (role === 'maison_production') {
        await User.createProductionCompany(userId, nom);
      }

      res.status(201).json({ 
        message: "Utilisateur enregistré avec succès", 
        userId: userId,
        role: role
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
    }
  },

};

module.exports = authController;