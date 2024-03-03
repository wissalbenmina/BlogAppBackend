const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(401).json(" you are not authorized");
    }

    const token = authHeader.split(" ")[1]; 

    if (!token) {
      return res.status(401).json("Unauthorized");
    }

    try {
      const decoded = jwt.verify(token, 'Secret123');
      const user = await User.findById(decoded.userId);

      if(!user){
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // jwt.verify(token, "Secret123", (error, user) => {
    //   if (error) {
    //     return res.status(401).json("You are not authorized");
    //   }
    //   req.user = user;
    //   next();
    // });
  };

module.exports = auth;