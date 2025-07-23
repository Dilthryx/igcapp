import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Building, Hammer, BarChart3, TrendingUp, 
  Briefcase, Users, Truck, UserCheck, Grid3x3, 
  FileText, ClipboardList, FileSignature, UserCircle 
} from 'lucide-react';
import logo from './assets/logo.png';

const IGCNominas = () => {
  const [activeNav, setActiveNav] = useState('inicio');
  const navigate = useNavigate();

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'empresas', label: 'Empresas', icon: Building },
    { id: 'obras', label: 'Obras', icon: Hammer },
    { id: 'sumatorio-empresas', label: 'Sumatorio Empresas', icon: BarChart3 },
    { id: 'sumatorio-obras', label: 'Sumatorio Obras', icon: TrendingUp },
    { id: 'puestos', label: 'Puestos', icon: Briefcase },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'proveedores', label: 'Proveedores', icon: Truck },
    { id: 'empleados', label: 'Empleados', icon: UserCheck },
    { id: 'conceptos', label: 'Conceptos', icon: Grid3x3 },
    { id: 'nominas-jornal', label: 'Nominas jornal', icon: FileText },
    { id: 'destajo', label: 'Destajo', icon: ClipboardList },
    { id: 'contratos', label: 'Contratos', icon: FileSignature },
    { id: 'cuenta', label: 'Cuenta', icon: UserCircle },
  ];

  const mainButtons = [
    { label: 'EMPRESAS', icon: Building, path: '/empresas' },
    { label: 'OBRAS', icon: Hammer, path: '/obras' },
    { label: 'SUMATORIO EMPRESAS', icon: BarChart3, path: '/sumatorio-empresas' },
    { label: 'SUMATORIO OBRAS', icon: TrendingUp, path: '/sumatorio-obras' },
    { label: 'PUESTOS', icon: Briefcase, path: '/puestos' },
    { label: 'USUARIOS', icon: Users, path: '/usuarios' },
    { label: 'PROVEEDORES', icon: Truck, path: '/proveedores' },
    { label: 'EMPLEADOS', icon: UserCheck, path: '/empleados' },
    { label: 'CONCEPTOS', icon: Grid3x3, path: '/conceptos' },
    { label: 'NOMINAS JORNAL', icon: FileText, path: '/nominas-jornal' },
    { label: 'DESTAJO', icon: ClipboardList, path: '/destajo' },
    { label: 'CONTRATOS', icon: FileSignature, path: '/contratos' },
  ];

  const handleNavClick = (itemId) => {
    setActiveNav(itemId);
    if (itemId === 'empresas') navigate('/empresas');
    else if (itemId === 'obras') navigate('/obras');
    // Agregar más navegaciones según necesites
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-900 flex flex-col overflow-y-auto">
        <div className="p-6 flex items-center justify-center">
          <img 
            src={logo} 
            alt="IGC Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>

        <nav className="flex-1 px-4 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-yellow-400 bg-gray-800' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 px-8 py-4 border-b border-gray-800">
          <h1 className="text-2xl font-semibold">IGC</h1>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-center mb-12">
            <img 
              src={logo} 
              alt="IGC Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
            {mainButtons.map((button) => {
              const Icon = button.icon;
              
              return (
                <button
                  key={button.label}
                  onClick={() => navigate(button.path)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {button.label}
                </button>
              );
            })}
            
            <button
              onClick={() => navigate('/cuenta')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-6 rounded-lg transition-colors col-span-2 flex items-center justify-center"
            >
              <UserCircle className="w-5 h-5 mr-3" />
              CUENTA
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IGCNominas;