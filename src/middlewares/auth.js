const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.sendStatus(403);
      }
      console.log('Decoded user:', user);
      req.user = user;
      next();
    });
  };

module.exports = { authenticateToken };