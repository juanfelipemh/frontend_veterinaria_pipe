import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditAfiliacion = () => {
  const [productos, setProductos] = useState([])

  const [mascotaId, setMascotaId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaRevision, setFechaRevision] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUnaAfiliacion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/obtenerUnaSolicitud/${id}`
        );
        setMascotaId(response.data.mascotaId);
        setProductoId(response.data.productoId);
        setDescripcion(response.data.descripcion);
        setFechaRevision(response.data.fechaRevision);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUnaAfiliacion();
  }, [id]);

  
  useEffect(() => {
    getProducts()
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/obtenerProductos");
    setProductos(response.data);
  };

  const actualizarAfiliacion = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/modificarAfiliacion/${id}`, {
        mascotaId: mascotaId,
        productoId: productoId,
        descripcion: descripcion,
        fechaRevision: fechaRevision,
      });
      navigate("/dashboard/afiliaciones");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="card is-shadowless">
      <div className="card-content">
        <div className="content">
          <form onSubmit={actualizarAfiliacion}>
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
              <label className="label">Modificar Servicio Contratado</label>
              <div className="mt-2">
                <div className="select">
                  <select onChange={(e) => setProductoId(e.target.value)}>
                    {productos.map((product) => (
                      <option key={product.UUID} value={Number(product.id)}>
                        {product.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
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
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEditAfiliacion;
