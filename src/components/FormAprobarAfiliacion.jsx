import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const FormAprobarAfiliacion = () => {
    const [mascotaId, setMascotaId] = useState("");
    const [productoId, setProductoId] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaRevision, setFechaRevision] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(()=>{ 
      const getUnaAfiliacion = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/obtenerUnaSolicitud/${id}`);
            setMascotaId(response.data.mascotaId);
            setProductoId(response.data.productoId);
            setDescripcion(response.data.descripcion);
            setFechaRevision(response.data.fechaRevision);
        } catch (error) {
            if(error.response){
              setMsg(error.response.data.msg);
            }
        }
      };
      getUnaAfiliacion();
    }, [id])

    const aprobar = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:5000/aprobarAfiliacion/${id}`, {
          descripcion: descripcion,
          fechaRevision: fechaRevision
        });
        navigate("/dashboard/afiliaciones")
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);    
      }
    }

  }
  return (
    <div className="card is-shadowless">
    <div className="card-content">
      <div className="content">
        <form onSubmit={aprobar}>
          <p className="has-text-centered">{msg}</p>
          <div className="field">
            <label className="label">Nombre Mascota</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={mascotaId}
                placeholder="ID mascota"
                
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Servicio Contratado</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={productoId}
                placeholder="ID Producto"
                
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Mensaje Cliente</label>
            <div className="control">
              <textarea
                type="text"
                className="input"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Fecha Aprobación</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={fechaRevision}
                onChange={(e) => setFechaRevision(e.target.value)}     
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Aprobar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
};

export default FormAprobarAfiliacion;