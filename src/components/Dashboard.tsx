import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Inventario from '../components/inventario/Inventario';
import Ventas from '../components/ventas/Ventas';
import Nomina from '../components/nomina/Nomina';


const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Función para manejar las redirecciones al hacer clic en los elementos del menú
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">

      <Sidebar handleNavigate={handleNavigate} /> {/* Pasar la función como prop */}
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="nomina" element={<Nomina />} />
        </Routes>
      </main>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  const sections = [
    {
      title: 'Inventario',
      description: 'Gestiona el inventario de productos, controla existencias y actualiza la disponibilidad.',
    },
    {
      title: 'Ventas',
      description: 'Administra las ventas, genera facturas y realiza seguimientos a los pedidos de clientes.',
    },
    {
      title: 'Nómina',
      description: 'Gestiona la nómina de los empleados, incluyendo sueldos, bonificaciones y deducciones.',
    },
    {
      title: 'Reportes',
      description: 'Genera reportes detallados sobre ventas, inventario, nómina y otros aspectos importantes.',
    },
  ];

  return (
    <div className="relative bg-cover bg-center min-h-screen" >
      <div className="container mx-auto p-4 bg-white bg-opacity-70 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
        <p className="mb-8">Selecciona una sección del menú para ver los detalles.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;