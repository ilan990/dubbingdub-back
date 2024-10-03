const User = require('../models/User'); 
const Contrat = require('../models/Contrat');
require('dotenv').config();

const contratServices = {
    addContrat: async (user, contratData) => {
        if (!contratData || typeof contratData !== 'object') {
          throw new Error('Données du contrat invalides ou manquantes');
        }
    
        if (user.role !== process.env.user_DA) {
          throw new Error("Seules les directeurs artistique peuvent ajouter des contrats");
        }
    
        // Validation de base
        if (!contratData.date_debut) {
          throw new Error('La date de début du contrat est obligatoire');
        }
    
        const contratDonnees = {
          ...contratData,
          statut: contratData.statut || 'en_attente'
        };
    
        // Création du contrat
        try {
          const contratId = await Contrat.create(contratDonnees);
          return contratId;
        } catch (error) {
          console.error('Erreur lors de la création du contrat:', error);
          throw new Error("Erreur lors de l'enregistrement du contrat");
        }
      },
    

};

  module.exports = contratServices;

