import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../services/movie.service';

export default function AddMovie() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', releaseYear: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createMovie({
        title: form.title,
        description: form.description,
        releaseYear: parseInt(form.releaseYear, 10),
      });
      navigate('/movies');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la pelicula');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Agregar Pelicula</h1>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Titulo</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            placeholder="Nombre de la pelicula"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Ano de estreno</label>
          <input
            type="number"
            name="releaseYear"
            value={form.releaseYear}
            onChange={handleChange}
            required
            min="1888"
            max="2030"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            placeholder="2024"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Descripcion</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="Sinopsis de la pelicula..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium px-6 py-2 rounded transition"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/movies')}
            className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-6 py-2 rounded transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
