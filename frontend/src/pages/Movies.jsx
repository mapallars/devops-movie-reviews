import { useState, useEffect } from 'react';
import { getMovies, deleteMovie } from '../services/movie.service';
import { useAuth } from '../context/AuthContext';

export default function Movies() {
  const { isAdmin } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (err) {
      setError('Error al cargar las peliculas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Estas seguro de eliminar esta pelicula?')) return;
    try {
      await deleteMovie(id);
      setMovies(movies.filter((m) => m.id !== id));
    } catch (err) {
      setError('Error al eliminar la pelicula');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-400 text-lg">Cargando peliculas...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Peliculas</h1>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {movies.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          <p className="text-xl">No hay peliculas registradas</p>
          <p className="text-sm mt-2">Las peliculas apareceran aqui cuando se agreguen.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-5 hover:border-indigo-500/50 transition"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
              <span className="inline-block bg-indigo-600/30 text-indigo-300 text-xs px-2 py-1 rounded mb-3">
                {movie.releaseYear}
              </span>
              <p className="text-gray-400 text-sm line-clamp-3">{movie.description}</p>

              {isAdmin && (
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="mt-4 text-red-400 hover:text-red-300 text-sm transition"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
