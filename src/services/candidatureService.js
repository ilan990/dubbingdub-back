const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Candidature = require('../models/Candidature');
require('dotenv').config();

const candidatureServices = {
    getCandidatures: async (user) => {
        const candidature = await Candidature.getCandidaturesByIdProd(user.userId);
        if (user.role == process.env.user_production || user.role == process.env.user_admin) {
            return candidature;
        }else{
            throw new Error("Vous n'êtes pas une maison de production !");
        }
        
      }
};

module.exports = candidatureServices;