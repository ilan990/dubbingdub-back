const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Candidature = require('../models/Candidature');
const { updateCandidature } = require('../controllers/candidatureController');
require('dotenv').config();

const candidatureServices = {
    getCandidatures: async (user) => {
        const candidature = await Candidature.getCandidaturesByIdProd(user.userId);
        if (user.role == process.env.user_production || user.role == process.env.user_admin) {
            return candidature;
        }else{
            throw new Error("Vous n'êtes pas une maison de production !");
        }
        
      },

      updateCandidature : async (user,id_candidature, candidatureData) => {
        if (!candidatureData || typeof candidatureData !== 'object') {
          throw new Error('Données de la candidature invalides ou manquantes');
        }
      
        const {...champsMovie} = candidatureData;
      
        const idDa = await Candidature.getDaByIdCandidature(id_candidature);
    
        if (user.userId !== idDa){
            throw new Error("Vous n'êtes pas le candidat de cette candidature !");
        }
      
        // Création du rôle
        const movie = await Candidature.updateCandidature({
          id_candidature : id_candidature,
          ...champsMovie,
        });
      
        return movie; 
      },  
};

module.exports = candidatureServices;