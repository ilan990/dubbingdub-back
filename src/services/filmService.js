const User = require('../models/User'); 
const Film = require('../models/Film');
require('dotenv').config();

const filmServices = {
    addMovie: async (userId, filmData) => {
        if (!filmData || typeof filmData !== 'object') {
          throw new Error('Données du film invalides ou manquantes');
        }
    
        // Vérifier si l'utilisateur est une maison de production et obtenir l'ID de production
        const productionId = await User.getProductionIdByUserId(userId);
        if (!productionId) {
          throw new Error("Seules les maisons de production peuvent ajouter des films");
        }
    
        // Validation de base
        if (!filmData.titre || filmData.titre.trim() === '') {
          throw new Error('Le titre du film est obligatoire');
        }
    
        // Ajouter l'ID de production aux données du film
        const filmDataWithProduction = {
          ...filmData,
          id_production: productionId,
          statut: filmData.statut || 'en_vente'
        };
    
        // Création du film
        try {
          const filmId = await Film.create(filmDataWithProduction);
          return filmId;
        } catch (error) {
          console.error('Erreur lors de la création du film:', error);
          throw new Error("Erreur lors de l'enregistrement du film");
        }
      },
      
    getMovies: async (userId) => {
        const film = await Film.getMovies(userId);
        
        if (!film) {
          throw new Error("Il n'y a pas de films");
        }
        
        const { mot_de_passe, ...filmsInfo } = film;
        return filmsInfo;
      },

    getFilmById: async (filmId, userId, userRole) => {
        try {
          const film = await Film.findById(filmId);
    
          if (!film) {
            return null;
          }
    
          // Vérification des autorisations
          if (userRole === process.env.user_admin || userRole === process.env.user_DA || (userRole === process.env.user_production && film.id_production === userId) ) {
            return film;
          }
    
    
          return null;
    
        } catch (error) {
          console.error('Erreur dans le service lors de la récupération du film:', error);
          throw error;
        }
    },

};

  module.exports = filmServices;

