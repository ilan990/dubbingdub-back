const User = require('../models/User'); 
const Film = require('../models/Film');

const filmServices = {
    addMovie: async (userId, filmData) => {
      if (!filmData || typeof filmData !== 'object') {
        throw new Error('Données du film invalides ou manquantes');
      }
  
      const { titre, description, date_sortie, statut, image } = filmData;
      
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
        image: image || null 
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
  };
  

  module.exports = filmServices;

