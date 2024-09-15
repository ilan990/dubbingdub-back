const authServices = require('../services/authService');

const authController = {
  register: async (req, res) => {
    try {
      const userId = await authServices.register(req.body);
      res.status(201).json({ 
        message: "Utilisateur enregistré avec succès", 
        userId: userId
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, mot_de_passe } = req.body;
      const result = await authServices.login(email, mot_de_passe);
      res.json(result);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.message);
      res.status(401).json({
        message: "Erreur lors de la connexion :",
          error: error.message 
       });
    }
  },
  
  logout: async (req, res) => {
    try {
      const result = await authServices.logout();
      res.json(result);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
  },
  
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.userId; // Obtenu du middleware d'authentification
      const updatedUser = await authServices.updateUserProfile(userId, req.body);
      res.json({ message: "Profil mis à jour avec succès", user: updatedUser });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      res.status(400).json({ message: error.message });
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const userInfo = await authServices.getUserInfo(req.user.userId);
      res.json(userInfo);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = authController;