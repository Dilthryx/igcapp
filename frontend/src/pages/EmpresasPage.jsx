// src/pages/EmpresasPage.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const EmpresasPage = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await api.get('/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error fetching empresas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreEmpresa.trim()) return;

    setLoading(true);
    try {
      await api.post('/empresas', { nombre: nombreEmpresa });
      setNombreEmpresa('');
      setShowForm(false);
      fetchEmpresas();
    } catch (error) {
      console.error('Error creating empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-8">Crear empresa</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Nombre de la empresa"
                required
              />
            </div>

            <div className="flex gap-4 pt-8">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNombreEmpresa('');
                }}
                className="flex-1 py-3 px-6 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-black transition-colors"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-semibold disabled:opacity-50"
              >
                {loading ? 'CREANDO...' : 'CREAR'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gray-900 px-6 py-4 flex items-center gap-4 border-b border-gray-800">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold">Empresas</h1>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-2">
          {empresas.map((empresa) => (
            <div
              key={empresa.id}
              className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {empresa.nombre}
            </div>
          ))}
        </div>

        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black p-4 rounded-full shadow-lg transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpresasPage;