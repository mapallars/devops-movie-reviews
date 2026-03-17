import API from '../api/axios';

export const getMovies = () => {
  return API.get('/movies');
};

export const getMovie = (id) => {
  return API.get(`/movies/${id}`);
};

export const createMovie = (movieData) => {
  return API.post('/movies', movieData);
};

export const updateMovie = (id, movieData) => {
  return API.put(`/movies/${id}`, movieData);
};

export const deleteMovie = (id) => {
  return API.delete(`/movies/${id}`);
};
