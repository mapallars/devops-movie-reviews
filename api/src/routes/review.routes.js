import authJwt from "../middlewares/authJwt.js";
import * as controller from "../controllers/review.controller.js";

export default function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Public route to get all reviews for a movie
    app.get("/api/movies/:movieId/reviews", controller.findAllForMovie);

    // Protected route to create a review for a movie
    app.post("/api/movies/:movieId/reviews", [authJwt.verifyToken], controller.create);

    // Protected routes to update/delete a specific review
    // The controller logic will handle if the user is the owner or an admin
    app.put("/api/reviews/:id", [authJwt.verifyToken], controller.update);
    app.delete("/api/reviews/:id", [authJwt.verifyToken], controller.delete);
};
