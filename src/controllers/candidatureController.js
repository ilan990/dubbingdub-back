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

    
};

module.exports = candidatureController;




// getCandidatures