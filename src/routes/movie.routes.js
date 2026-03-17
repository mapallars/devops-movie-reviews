const authJwt = require("../middlewares/authJwt.js");
const controller = require("../controllers/movie.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Public routes
  app.get("/api/movies", controller.findAll);
  app.get("/api/movies/:id", controller.findOne);

  // Admin-only routes
  app.post("/api/movies", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
  app.put("/api/movies/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  app.delete("/api/movies/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
};
