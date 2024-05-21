import React from "react";
import { useAuth } from "../contexts/AuthContext"; // Actualiza la importación

// Icons
import { RiSearch2Line } from "react-icons/ri";

const Header = () => {
  const authContext = useAuth(); // Usa el contexto directamente
  const currentUser = authContext?.currentUser; // Asegúrate de que currentUser está definido
  const userName = currentUser?.email ?? "Invitado"; // Usa el correo electrónico del usuario

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        🌞 ¡Bienvenido, <span className="text-primary-100">{userName}</span>!
      </h1>
      <form className="w-full md:w-auto">
        <div className="relative">
          <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="text"
            className="bg-gray-200 outline-none py-2 pl-8 pr-4 rounded-xl w-full md:w-auto"
            placeholder="Search for projects"
          />
        </div>
      </form>
    </header>
  );
};

export default Header;
