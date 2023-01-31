import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
  const [identificacion, setIdentificacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/usuarioregistrado/${id}`);
        setIdentificacion(response.data.identificacion);
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setTelefono(response.data.telefono);
        setCorreo(response.data.correo);
        setClave(response.data.clave);
        setConfirmarClave(response.data.confirmarClave);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const actualizarUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/actualizarUsuario/${id}`, {
        identificacion: identificacion,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        clave: clave,
        confirmarClave: confirmarClave
      });
      navigate("/dashboard/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Usuarios</h1>
      <h2 className="subtitle">Agregar nuevo usuario</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={actualizarUsuario}>
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
                <label className="label">Apellidos</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Apellidos"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Teléfono</label>
                <div className="control">
                  <input
                    type="number"
                    required
                    className="input"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Teléfono"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Correo Electrónico</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Correo electrónico"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Contraseña</label>
                <div className="control">
                  <input
                    type="password"
                    required
                    className="input"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    placeholder="*******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirmar contraseña</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    required
                    value={confirmarClave}
                    onChange={(e) => setConfirmarClave(e.target.value)}
                    placeholder="*******"
                  />
                </div>
               </div>  
              {/* <div className="field">
                <label className="label">Rol</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={rol}
                      onChange={(e) => setRol(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>  */}
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

export default FormEditUser;
