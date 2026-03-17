const db = require('../models');
const Movie = db.Movie;

// Create and Save a new Movie
exports.create = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).send(movie);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while creating the Movie." });
    }
};

// Retrieve all Movies from the database.
exports.findAll = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.send(movies);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving movies." });
    }
};

// Find a single Movie with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findByPk(id);
        if (movie) {
            res.send(movie);
        } else {
            res.status(404).send({ message: `Cannot find Movie with id=${id}.` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error retrieving Movie with id=" + id });
    }
};

// Update a Movie by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await Movie.update(req.body, { where: { id: id } });
        if (num == 1) {
            res.send({ message: "Movie was updated successfully." });
        } else {
            res.send({ message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating Movie with id=" + id });
    }
};

// Delete a Movie with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await Movie.destroy({ where: { id: id } });
        if (num == 1) {
            res.send({ message: "Movie was deleted successfully!" });
        } else {
            res.send({ message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Could not delete Movie with id=" + id });
    }
};
