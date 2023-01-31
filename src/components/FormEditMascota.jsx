import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditMascota = () => {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [foto, setFoto] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getMascotaById = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/obtenerUnaMascota/${id}`
            );
            setNombre(response.data.nombre);
            setEdad(response.data.edad);
            setDescripcion(response.data.descripcion);
            setFoto(response.data.foto);
          } catch (error) {
            if (error.response) {
              setMsg(error.response.data.msg);
            }
          }
        };
        getMascotaById();
      }, [id]);
    
      // Función para actualizar producto. Se agrega al <form> para que envie al servidor una vez presionado el boton tipo <submit>
      const actualizarMascota = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:5000/actualizarMascota/${id}`, {
            nombre: nombre,
            edad: edad,
            descripcion: descripcion,
            foto: foto
          });
          navigate("/dashboard/mascots");
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
          <form onSubmit={actualizarMascota}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Edad</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  placeholder="Edad"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Descripcion</label>
              <div className="control">
                <textarea
                  type="text"
                  className="input"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Ingrese su descripcion"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Foto</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={foto}
                  onChange={(e) => setFoto(e.target.value)}
                  placeholder="Ingrese URL foto"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success">
                  Grabar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEditMascota;
