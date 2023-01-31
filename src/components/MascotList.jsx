import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const MascotList = () => {
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        getMascots();
      }, []);
    
      const getMascots = async () => {
        const response = await axios.get("http://localhost:5000/obtenerMascotas");
        setMascotas(response.data);
      };
    
      const deleteMascot = async (mascotId) => {
        await axios.delete(`http://localhost:5000/eliminarMascota/${mascotId}`);
        getMascots();
      };
    

  return (
    <div>
    <h1 className="title">Mascotas</h1>
    <h2 className="subtitle">Mascotas Registradas</h2>
    <Link to="/dashboard/mascots/add" className="button is-primary mb-2">
      Agregar Mascota
    </Link>
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>No</th>
          <th>Nombre</th>
          <th>edad</th>
          <th>Descripcion</th>
          <th>Propietario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {mascotas.map((mascota, index) => (
          <tr key={mascota.UUID}>
            <td>{index + 1}</td>
            <td>{mascota.nombre}</td>
            <td>{mascota.edad}</td>
            <td>{mascota.descripcion}</td>
            <td>{mascota.usuario.nombre}</td>
            <td>
              <Link
                to={`/dashboard/mascots/edit/${mascota.UUID}`}
                className="button is-small is-info m-1"
              >
                Editar
              </Link>
              <Link
                to={`/dashboard/afiliaciones/nuevaAfiliacion/${mascota.UUID}`}
                className="button is-small is-success m-1"
              >
                Afiliar Mascota
              </Link>
              <button
                onClick={() => deleteMascot(mascota.UUID)}
                className="button is-small is-danger m-1"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
