const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json(" you are not authorized");
    }
    const token = authHeader.split(" ")[1]; 
    if (!token) {
      return res.status(401).json("Token does not exist");
    }
    jwt.verify(token, "Secret123", (error, user) => {
      if (error) {
        return res.status(401).json("You are not authorized");
      }
      req.user = user;
      next();
    });
  };

module.exports = auth;