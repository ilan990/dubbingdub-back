const filmServices = require('../services/filmService');

const filmController = {
    addMovie: async (req, res) => {
      try {
        if (!req.user || !req.user.userId) {
          return res.status(401).json({ message: "Utilisateur non authentifié ou userId manquant" });
        }
        const userId = req.user.userId;
        
        const { titre, description, date_sortie, statut, image } = req.body;
        const filmId = await filmServices.addMovie(userId, { titre, description, date_sortie, statut, image });
      
        res.status(201).json({
          message: "Film enregistré avec succès",
          filmId: filmId
        });
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
        res.status(400).json({ message: error.message });
      }
    },



    getMovie: async (req, res) => {
        try {
          const films = await filmServices.getMovies(req.user);

          res.status(201).json({
            message: "Voici la liste des films : ",
            films: films
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
          res.status(500).json({ message: error.message });
        }
      }
};

module.exports = filmController;