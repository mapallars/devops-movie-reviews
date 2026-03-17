import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300">
          MovieReviews
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/movies" className="text-gray-300 hover:text-white transition">
            Peliculas
          </Link>

          {user && isAdmin && (
            <Link to="/add-movie" className="text-gray-300 hover:text-white transition">
              Agregar Pelicula
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded transition"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Iniciar Sesion
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded transition"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
