import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  // Usamos para importar los datos de usuario autenticado y extraemos el nombre del usuario autenticado. Se incluye como un ternario luego del "Bienvenido de nuevo..."
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Bienvenido de nuevo <strong>{user && user.nombre}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
