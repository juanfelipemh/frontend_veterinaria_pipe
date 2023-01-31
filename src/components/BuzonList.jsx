import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BuzonList = () => {
    const [mensajes, setMensajes] = useState([]);

    useEffect(()=> {
        getMensajes()
    }, []);

    const getMensajes = async ()=> {
        const response = await axios.get("http://localhost:5000/verBuzon");
        setMensajes(response.data);
    };

    const borrarMensaje = async (mensajeId) => {
        await axios.delete(`http://localhost:5000/limpiarBuzon/${mensajeId}`);
        getMensajes();
    }

  return (
    <>
    <h1 className="title">Mensajes Buzon</h1>
    <h2 className="subtitle">Clientes interesados</h2>
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>No</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Descripcion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {mensajes.map((mensaje, index) => (
          <tr key={mensaje.UUID}>
            <td>{index + 1}</td>
            <td>{mensaje.nombres}</td>
            <td>{mensaje.apellidos}</td>
            <td>{mensaje.telefono}</td>
            <td>{mensaje.correo}</td>
            <td>{mensaje.descripcion}</td>
            <td>
              <button
                onClick={() => borrarMensaje(mensaje.UUID)}
                className="button is-small is-danger m-1"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default BuzonList