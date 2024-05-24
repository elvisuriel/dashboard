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
  return (
    <>
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
      <p>Selecciona una sección del menú para ver los detalles.</p>
    </>
  );
};

export default Dashboard;
