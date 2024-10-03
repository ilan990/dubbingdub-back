const candidatureServices = require('../services/candidatureService');

const candidatureController = {
 
    getCandidatures: async (req, res) => {
        try {
            const candidatures = await candidatureServices.getCandidatures(req.user);

            res.status(201).json({
            message: "Voici la liste des candidatures : ",
            candidatures: candidatures
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            res.status(500).json({ message: error.message });
        }
    },

    updateCandidature: async (req, res) => {
        try {
          const user = req.user; // Obtenu du middleware d'authentification
          const candidatureId = req.params.id;
          const updatedMovie = await candidatureServices.updateCandidature(user, candidatureId, req.body);
          res.json({ message: "Candidature mis à jour avec succès", movie: updatedMovie });
        } catch (error) {
          console.error('Erreur lors de la mise à jour du candidature:', error);
          res.status(400).json({ 
              message: "Erreur lors de la mise à jour du candidature",
              error: error.message 
           });
        }
      },

    
};

module.exports = candidatureController;




// getCandidatures