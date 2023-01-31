import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Contacto = () => {
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const grabarMensaje = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/crearBuzon", {
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
                correo: correo,
                descripcion: descripcion
            });
            navigate("/contacto");
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    };


  return (
    <>

        <div className="mb-6 ">
          <nav
            className="navbar has-background-light"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <p>
                  <strong className="is-size-4 has-text-primary">
                    Mascota Feliz
                  </strong>
                </p>
              </Link>
              <a
                role="button"
                className="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item">Inicio</a>

                <a className="navbar-item">Servicios</a>

                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Más</a>

                  <div className="navbar-dropdown">
                    <a className="navbar-item">Acerca de Nosotros</a>
                    <Link to={"/contacto"} className="navbar-item">
                      Contacto
                    </Link>
                  </div>
                </div>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Link to={"/login"} className="button is-light">
                      Ingresar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      <div>
        <h1 className="has-text-centered has-text-weight-bold is-size-3">Deja tus datos. Nosotros te contactaremos.</h1>
      </div>
      
      <div className="m-6">
        <form onSubmit={grabarMensaje}>
          <p className="has-text-centered">{msg}</p>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Ingrese su nombre"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Apellido</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Ingrese su apellido"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Teléfono</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingrese su número telefónico"
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
                placeholder="Ingrese su correo electrónico"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Mensaje</label>
            <div className="control">
              <textarea
                type="text"
                className="input"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese su mensaje"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success"
              >
                Enviar Mensaje
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contacto;
