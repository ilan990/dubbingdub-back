const User = require('../models/User'); 
const Film = require('../models/Film');
require('dotenv').config();

const filmServices = {
    addMovie: async (userId, filmData) => {
        if (!filmData || typeof filmData !== 'object') {
          throw new Error('Données du film invalides ou manquantes');
        }
    
        const {
          titre,
          description,
          date_sortie,
          statut,
          image,
          duree,
          pays_origine,
          realisateur,
          scenaristes,
          genres,
          budget,
          nb_personnages_parlants,
          langue_originale,
          notes_critiques,
          lien_bande_annonce,
          date_limite_doublage
        } = filmData;
    
        // Validation
        if (!titre || titre.trim() === '') {
          throw new Error('Le titre du film est obligatoire');
        }
    
        // Vérifier si l'utilisateur est une maison de production et obtenir l'ID de production
        const productionId = await User.getProductionIdByUserId(userId);
        if (!productionId) {
          throw new Error("Seules les maisons de production peuvent ajouter des films");
        }
    
        // Création du film
        const filmId = await Film.create({
          titre,
          description,
          date_sortie,
          id_production: productionId,
          statut: statut || 'en_vente',
          image: image || null,
          duree: duree || null,
          pays_origine: pays_origine || null,
          realisateur: realisateur || null,
          scenaristes: scenaristes || null,
          genres: genres || null,
          budget: budget || null,
          nb_personnages_parlants: nb_personnages_parlants || null,
          langue_originale: langue_originale || null,
          notes_critiques: notes_critiques || null,
          lien_bande_annonce: lien_bande_annonce || null,
          date_limite_doublage: date_limite_doublage || null
        });
    
        return filmId;
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

