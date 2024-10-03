const contratServices = require('../services/contratService');

const contratController = {
    addContrat: async (req, res) => {
        try {
          const user = req.user;
          const contratData = {
            ...req.body
          };
          const contratId = await contratServices.addContrat(user, contratData);
          res.status(201).json({
            message: "contrat enregistré avec succès",
            contratId: contratId
          });
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement:', error);
          res.status(500).json({ message: "Erreur lors de l'enregistrement du contrat" });
        }
    },

    getContrat: async (req, res) => {
        try {
          const contrats = await contratServices.getContrats(req.user);

          res.status(201).json({
            message: "Voici la liste des contrats : ",
            contrats: contrats
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
          res.status(500).json({ message: error.message });
        }
    },

    
};

module.exports = contratController;