import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AfiliciacionList = () => {
  const [afiliaciones, setAfiliaciones] = useState([]);
  const { user } = useSelector((state)=>state.auth);

  useEffect(()=>{
    getAfiliaciones()
  }, []);

  const getAfiliaciones = async () => {
    const response = await axios.get("http://localhost:5000/obtenerSolicitudes")
    setAfiliaciones(response.data)
  }

  const deleteAfiliacion = async (afiliacionId) => {
    await axios.delete(`http://localhost:5000/eliminarAfiliaciones/${afiliacionId}`)
    getAfiliaciones();
  }

  return (
    <>
    <h1 className="title">Afiliaciones</h1>
    <h2 className="subtitle">Lista de afiliaciones</h2>
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>No</th>
          <th>Nombre Mascota</th>
          <th>Nombre Producto</th>
          <th>Descripcion</th>
          <th>Fecha</th>
          <th>Confirmado</th>
          <th>Cliente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {afiliaciones.map((afiliacion, index) => (
          <tr key={afiliacion.UUID}>
            <td>{index + 1}</td>
            <td>{afiliacion.mascotaId}</td>
            <td>{afiliacion.productoId}</td>
            <td>{afiliacion.descripcion}</td>
            <td>{afiliacion.fechaRevision}</td>
            <td>{afiliacion.confirmado.toString()}</td>
            <td>{afiliacion.usuario.nombre}</td>
            <td>
              <Link
                to={`/dashboard/afiliaciones/editarAfiliacion/${afiliacion.UUID}`}
                className="button is-small is-info m-1"
              >
                Editar
              </Link>
              { user && user.rol === "admin" && (
              <Link
                to={`/dashboard/afiliaciones/aprobarAfiliacion/${afiliacion.UUID}`}
                className="button is-small is-success m-1"
              >
                Aprobar
              </Link>
              )}
              { user && user.rol === "admin" && (
              <button
                onClick={() => deleteAfiliacion(afiliacion.UUID)}
                className="button is-small is-danger m-1"
              >
                Eliminar
              </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  )
}

export default AfiliciacionList