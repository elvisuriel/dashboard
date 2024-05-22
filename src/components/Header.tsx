import React from "react";
import LogoutButton from './LogoutButton';

// Icons
import { RiSearch2Line } from "react-icons/ri";

const Header = () => {


  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        🌞 ¡Bienvenido!
      </h1>
      <form className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
        <div className="relative w-full md:w-auto">
          <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="text"
            className="bg-gray-200 outline-none py-2 pl-8 pr-4 rounded-xl w-full md:w-auto"
            placeholder="Search for projects"
          />
        </div>
        <div className="w-full md:w-auto">
          <LogoutButton />
        </div>
      </form>
    </header>
  );
};

export default Header;
