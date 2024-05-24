import React, { useState } from 'react';
import { RiHome3Line, RiBarChart2Fill, RiMoneyDollarCircleFill, RiMore2Fill, RiCloseFill } from 'react-icons/ri';
import Profile from './Profile';

interface SidebarProps {
  handleNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleNavigate }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <div className={`bg-primary-900 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${showMenu ? 'left-0' : '-left-full'}`}>
        {/* Profile */}
        <Profile />
        {/* Nav */}
        <div className="bg-primary-300 p-8 rounded-tr-[100px] h-[70vh] overflow-y-scroll flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-8">
            <button onClick={() => handleNavigate('inventario')} className="flex items-center gap-2 text-white">
              <RiHome3Line /> Inventario
            </button>
            <button onClick={() => handleNavigate('ventas')} className="flex items-center gap-2 text-white">
              <RiBarChart2Fill /> Ventas
            </button>
            <button onClick={() => handleNavigate('nomina')} className="flex items-center gap-2 text-white">
              <RiMoneyDollarCircleFill /> Nómina
            </button>
          </nav>
          <div className="bg-primary-900/50 text-white p-7 rounded-xl">
            <p className="text-gray-400">¿Necesitas ayuda?</p>
            <a href="#">Contáctanos</a>
          </div>
        </div>
      </div>
      {/* Button mobile */}
      <button onClick={() => setShowMenu(!showMenu)} className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50">
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};

export default Sidebar;
