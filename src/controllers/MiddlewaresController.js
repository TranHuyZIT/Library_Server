const jwt = require("jsonwebtoken");
const MiddlewaresController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    // console.log(token);
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_KEY, (error, user) => {
        if (error) {
          console.log(error);
          res.status(500).json(error);
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated.");
    }
  },
  verifyAdmin: (req, res, next) => {
    MiddlewaresController.verifyToken(req, res, () => {
      if (req.user.admin) {
        next();
      } else {
        return res.status(403).json("You are not ADMIN.");
      }
    });
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    MiddlewaresController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You are not allowed to do that.");
      }
    });
  },
};

module.exports = MiddlewaresController;
