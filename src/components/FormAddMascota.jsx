import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormAddMascota = () => {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [foto, setFoto] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
  
    // onSubmit --> Esta función se implementa en el <form>, porque una vez se presiona el boton, al ser tipo "submit", enviará la información al servidor y ejecutará la función  
    const grabarMascota = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/agregarMascotas", {
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
    <div>
      <h1 className="title">Mascotas</h1>
      <h2 className="subtitle">Agregar nueva mascota</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={grabarMascota}>
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
    </div>
  );
};

export default FormAddMascota;
