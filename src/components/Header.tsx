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
        🌞 ¡Buenos días, <span className="text-primary-100">{userName}</span>!
      </h1>
      {/* Elimina el formulario de búsqueda si no lo necesitas */}
    </header>
  );
};

export default Header;
