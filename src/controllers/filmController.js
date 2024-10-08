const filmServices = require('../services/filmService');

const filmController = {
    addMovie: async (req, res) => {
        try {
          const userId = req.user.userId;
          const filmData = {
            ...req.body,
            id_production: userId
          };
          const filmId = await filmServices.addMovie(userId, filmData);
          res.status(201).json({
            message: "Film enregistré avec succès",
            filmId: filmId
          });
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement:', error);
          res.status(500).json({ message: "Erreur lors de l'enregistrement du film" });
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
      },

      getFilmById: async (req, res) => {
        try {
          const filmId = req.params.id;
          const userId = req.user.userId;
          const userRole = req.user.role;
    
          const film = await filmServices.getFilmById(filmId, userId, userRole);
          
          if (!film) {
            return res.status(404).json({ message: "Film introuvable" });
          }
          
          res.status(200).json(film);
        } catch (error) {
          console.error('Erreur lors de la récupération du film:', error);
          res.status(500).json({ message: "Erreur serveur lors de la récupération du film" });
        }
      },

      addRole: async (req, res) => {
        try {
          const user = req.user;
          const filmId = req.params.id;
          const roleData = {
            ...req.body
          };
          const role = await filmServices.addRole(filmId, user, roleData);
          res.status(201).json({
            message: "Rôle enregistré avec succès",
            role: role
          });
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement:', error);
          res.status(500).json({ message: "Erreur lors de l'enregistrement du role" });
        }
    },

  getRolesByIdMovie: async (req, res) => {
      try {
        const user = req.user;
        const filmId = req.params.id;
        
        const role = await filmServices.getRolesByIdMovie(filmId, user);
        res.status(201).json({
          message: "Voici la liste des rôles du films : ",
          role: role
        });
      } catch (error) {
        console.error('Erreur lors de la réception du rôle:', error);
        res.status(500).json({ 
          message: "Erreur lors de la réception du rôle",
          error: error.message 
        });
      }
  },

  updateMovie: async (req, res) => {
    try {
      const user = req.user; // Obtenu du middleware d'authentification
      const filmId = req.params.id;
      const updatedMovie = await filmServices.updateMovie(user, filmId, req.body);
      res.json({ message: "Film mis à jour avec succès", movie: updatedMovie });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du film:', error);
      res.status(400).json({ 
          message: "Erreur lors de la mise à jour du film",
          error: error.message 
       });
    }
  },

  
  deleteMovie: async (req, res) => {
    try {
      const user = req.user; // Obtenu du middleware d'authentification
      const filmId = req.params.id;
      const updatedMovie = await filmServices.deleteMovie(user, filmId);
      res.json({ message: "Film supprimé avec succès", movie: updatedMovie });
    } catch (error) {
      console.error('Erreur lors de la suppression du film : ', error);
      res.status(400).json({ 
          message: "Erreur lors de la suppression du film : ",
          error: error.message 
       });
    }
  },

  candidatureDA: async (req, res) => {
    try {
      const user = req.user; // Obtenu du middleware d'authentification
      const filmId = req.params.id;
      if (!req.body) {
        req.body.message = null;
      }
      const candidature = await filmServices.candidatureDA(user, filmId, req.body);
      res.json({ message: "Candidature enregistré", id: candidature });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la candidature : ', error);
      res.status(400).json({ 
          message: "Erreur lors de l\'enregistrement de la candidature : ",
          error: error.message 
       });
    }
  }
    
};

module.exports = filmController;