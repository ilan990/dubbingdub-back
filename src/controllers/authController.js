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
      console.error('Erreur lors de la connexion:', error);
      res.status(401).json({ message: error.message });
    }
  },
  
  logout: async (req, res) => {
    try {
      const result = await authServices.logout(req.user.userId);
      res.json(result);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
  }
};

module.exports = authController;