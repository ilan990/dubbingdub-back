// src/services/authServices.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authServices = {
  verifyToken: async (token) => {
    try {
      // Supprimer le préfixe 'Bearer ' si présent
      const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;

      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return { valid: false, error: "Utilisateur non trouvé" };
      }

      const { mot_de_passe, ...userInfo } = user;
      return { 
        valid: true, 
        user: { 
          ...userInfo, 
          userId: user.id,  // Assurez-vous que l'ID est inclus
          role: user.role   // Assurez-vous que le rôle est inclus
        } 
      };
    } catch (error) {
      console.error('Erreur de vérification du token:', error);
      return { valid: false, error: error.message };
    }
  },

  register: async (userData) => {
    const { nom, prenom, email, mot_de_passe, role } = userData;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error("Un utilisateur avec cet email existe déjà");
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

    return userId;
  },

  login: async (email, mot_de_passe) => {
    // Trouver l'utilisateur par email
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isPasswordValid) {
      throw new Error("Email ou mot de passe incorrect");
    }
    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return { userId: user.id, role: user.role, token };
  },

  logout: async (userId) => {
    return { message: "Déconnexion réussie" };
  },

  updateUserProfile: async (userId, userData) => {
   const currentUser = await User.findById(userId);
    if (!currentUser) {
      throw new Error("Utilisateur non trouvé");
    }

    // Fusionner les données actuelles avec les nouvelles données
    const updatedData = {
      nom: userData.nom || currentUser.nom,
      prenom: userData.prenom || currentUser.prenom,
      email: userData.email || currentUser.email
    };

    // Mettre à jour l'utilisateur avec les données fusionnées
    const updated = await User.update(userId, updatedData);
    if (!updated) {
      throw new Error("Impossible de mettre à jour le profil utilisateur");
    }

    // Récupérer et retourner les données mises à jour
    const updatedUser = await User.findById(userId);
    const { mot_de_passe, ...userInfo } = updatedUser;
    return userInfo;
  },

  validateToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Token invalide");
    }
  },
  getUserInfo: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    // Retournez les informations de l'utilisateur sans le mot de passe
    const { mot_de_passe, ...userInfo } = user;
    return userInfo;
  },
};

module.exports = authServices;