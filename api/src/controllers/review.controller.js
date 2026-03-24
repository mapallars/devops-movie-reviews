import db from '../models/index.js';
const Review = db.Review;
const Movie = db.Movie;
const User = db.User;

// Create and Save a new Review for a Movie
export const create = async (req, res) => {
    const { movieId } = req.params;
    const userId = req.userId; // from authJwt middleware

    try {
        // Check if movie and user exist
        const movie = await Movie.findByPk(movieId);
        if (!movie) return res.status(404).send({ message: "Movie not found." });

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).send({ message: "User not found." });

        const review = await Review.create({
            content: req.body.content,
            rating: req.body.rating,
            movieId: movieId,
            userId: userId
        });
        res.status(201).send(review);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while creating the Review." });
    }
};

// Retrieve all Reviews for a Movie from the database.
export const findAllForMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        const reviews = await Review.findAll({ where: { movieId: movieId }, include: [User] });
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving reviews." });
    }
};

// Update a Review by the id in the request
export const update = async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;

    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).send({ message: `Review not found.` });
        }

        // Check if the user is the owner of the review
        if (review.userId !== userId) {
            // Allow admin to update any review
            const user = await User.findByPk(userId);
            const roles = await user.getRoles();
            const isAdmin = roles.some(role => role.name === 'admin');
            if (!isAdmin) {
                return res.status(403).send({ message: "Forbidden: You can only update your own reviews." });
            }
        }
        
        const [num] = await Review.update(req.body, { where: { id: id } });

        if (num === 1) {
            res.send({ message: "Review was updated successfully." });
        } else {
            res.send({ message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating Review with id=" + id });
    }
};

// Delete a Review with the specified id in the request
const deleteReview = async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;

    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).send({ message: `Review not found.` });
        }
        
        // Check if the user is the owner of the review
        if (review.userId !== userId) {
            // Allow admin to delete any review
            const user = await User.findByPk(userId);
            const roles = await user.getRoles();
            const isAdmin = roles.some(role => role.name === 'admin');
            if (!isAdmin) {
                return res.status(403).send({ message: "Forbidden: You can only delete your own reviews." });
            }
        }

        const num = await Review.destroy({ where: { id: id } });

        if (num === 1) {
            res.send({ message: "Review was deleted successfully!" });
        } else {
            res.send({ message: `Cannot delete Review with id=${id}. Maybe Review was not found!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Could not delete Review with id=" + id });
    }
};

export { deleteReview as delete };
