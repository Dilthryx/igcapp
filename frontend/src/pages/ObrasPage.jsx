// src/pages/ObrasPage.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ObrasPage = () => {
  const navigate = useNavigate();
  const [obras, setObras] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa_id: '',
    sub_contrato: '',
    no_procedimiento: '',
    descripcion_obra: '',
    monto_sin_iva: '',
    monto_total: '',
    monto_sin_iva_sub: '',
    monto_total_sub: '',
    clave_siroc_origen: '',
    clave_siroc_sub: '',
    fecha_inicio_contrato: '',
    fecha_termino_contrato: '',
    fecha_apertura_siroc: '',
    fecha_termino_siroc: '',
    m2_construccion: '',
    imss_teorico: '',
    ubicacion_cp: '',
    ubicacion_referencia: ''
  });

  useEffect(() => {
    fetchObras();
    fetchEmpresas();
  }, []);

  const fetchObras = async () => {
    try {
      const response = await api.get('/obras');
      setObras(response.data);
    } catch (error) {
      console.error('Error fetching obras:', error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await api.get('/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error fetching empresas:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...formData,
      empresa_id: parseInt(formData.empresa_id),
      monto_sin_iva: formData.monto_sin_iva ? parseFloat(formData.monto_sin_iva) : null,
      monto_total: formData.monto_total ? parseFloat(formData.monto_total) : null,
      monto_sin_iva_sub: formData.monto_sin_iva_sub ? parseFloat(formData.monto_sin_iva_sub) : null,
      monto_total_sub: formData.monto_total_sub ? parseFloat(formData.monto_total_sub) : null,
      m2_construccion: formData.m2_construccion ? parseFloat(formData.m2_construccion) : null,
      imss_teorico: formData.imss_teorico ? parseFloat(formData.imss_teorico) : null,
    };

    // Convert empty strings to null for optional fields
    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === '') {
        dataToSend[key] = null;
      }
    });

    try {
      await api.post('/obras', dataToSend);
      setShowForm(false);
      setFormData({
        nombre: '',
        empresa_id: '',
        sub_contrato: '',
        no_procedimiento: '',
        descripcion_obra: '',
        monto_sin_iva: '',
        monto_total: '',
        monto_sin_iva_sub: '',
        monto_total_sub: '',
        clave_siroc_origen: '',
        clave_siroc_sub: '',
        fecha_inicio_contrato: '',
        fecha_termino_contrato: '',
        fecha_apertura_siroc: '',
        fecha_termino_siroc: '',
        m2_construccion: '',
        imss_teorico: '',
        ubicacion_cp: '',
        ubicacion_referencia: ''
      });
      fetchObras();
    } catch (error) {
      console.error('Error creating obra:', error);
    } finally {
      setLoading(false);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-8">Crear obra</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Nombre"
                required
              />
            </div>

            <div>
              <select
                name="empresa_id"
                value={formData.empresa_id}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                required
              >
                <option value="">Empresa</option>
                {empresas.map(empresa => (
                  <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                name="sub_contrato"
                value={formData.sub_contrato}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="SUB CONTRATO"
              />
            </div>

            <div>
              <input
                type="text"
                name="no_procedimiento"
                value={formData.no_procedimiento}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="NO. PROCEDIMIENTO"
              />
            </div>

            <div>
              <input
                type="text"
                name="descripcion_obra"
                value={formData.descripcion_obra}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="DESCRIPCIÓN DE LA OBRA"
              />
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                name="monto_sin_iva"
                value={formData.monto_sin_iva}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="MONTO DE LA OBRA SIN IVA"
              />
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                name="monto_total"
                value={formData.monto_total}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="MONTO TOTAL DE LA OBRA"
              />
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                name="monto_sin_iva_sub"
                value={formData.monto_sin_iva_sub}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="MONTO DE LA OBRA SIN IVA SUB CONTRATO"
              />
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                name="monto_total_sub"
                value={formData.monto_total_sub}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="MONTO TOTAL DE LA OBRA SUB CONTRATO"
              />
            </div>

            <div>
              <input
                type="text"
                name="clave_siroc_origen"
                value={formData.clave_siroc_origen}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="CLAVE SIROC ORIGEN"
              />
            </div>

            <div>
              <input
                type="text"
                name="clave_siroc_sub"
                value={formData.clave_siroc_sub}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="CLAVE SIROC SUB CONTRATO"
              />
            </div>

            <div>
              <input
                type="date"
                name="fecha_inicio_contrato"
                value={formData.fecha_inicio_contrato}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500 text-gray-400"
                placeholder="FECHA INICIO CONTRATO"
              />
            </div>

            <div>
              <input
                type="date"
                name="fecha_termino_contrato"
                value={formData.fecha_termino_contrato}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500 text-gray-400"
                placeholder="FECHA TÉRMINO CONTRATO"
              />
            </div>

            <div>
              <input
                type="date"
                name="fecha_apertura_siroc"
                value={formData.fecha_apertura_siroc}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500 text-gray-400"
                placeholder="FECHA APERTURA SIROC"
              />
            </div>

            <div>
              <input
                type="date"
                name="fecha_termino_siroc"
                value={formData.fecha_termino_siroc}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500 text-gray-400"
                placeholder="FECHA TÉRMINO SIROC"
              />
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                name="m2_construccion"
                value={formData.m2_construccion}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="M2 DE CONSTRUCCIÓN"
              />
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                name="imss_teorico"
                value={formData.imss_teorico}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="IMSS TEÓRICO"
              />
            </div>

            <div>
              <input
                type="text"
                name="ubicacion_cp"
                value={formData.ubicacion_cp}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="UBICACIÓN CON CP"
              />
            </div>

            <div>
              <input
                type="text"
                name="ubicacion_referencia"
                value={formData.ubicacion_referencia}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="ENTRE QUÉ CALLES CRUZA LA UBICACIÓN, Y REFERENCIAS ADICIONALES"
              />
            </div>

            <div className="flex gap-4 pt-8">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    nombre: '',
                    empresa_id: '',
                    sub_contrato: '',
                    no_procedimiento: '',
                    descripcion_obra: '',
                    monto_sin_iva: '',
                    monto_total: '',
                    monto_sin_iva_sub: '',
                    monto_total_sub: '',
                    clave_siroc_origen: '',
                    clave_siroc_sub: '',
                    fecha_inicio_contrato: '',
                    fecha_termino_contrato: '',
                    fecha_apertura_siroc: '',
                    fecha_termino_siroc: '',
                    m2_construccion: '',
                    imss_teorico: '',
                    ubicacion_cp: '',
                    ubicacion_referencia: ''
                  });
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
        <h1 className="text-2xl font-semibold">Obras</h1>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-2">
          {obras.map((obra) => (
            <div
              key={obra.id}
              className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {obra.nombre}
            </div>
          ))}
        </div>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg shadow-lg transition-colors font-semibold"
          >
            AGREGAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObrasPage;