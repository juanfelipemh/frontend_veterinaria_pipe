import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // onSubmit --> Esta función se implementa en el <form>, porque una vez se presiona el boton, al ser tipo "submit", enviará la información al servidor y ejecutará la función  
  const grabarProducto = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/crearProducto", {
        titulo: titulo,
        descripcion: descripcion,
        precio: precio
      });
      navigate("/dashboard/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Productos</h1>
      <h2 className="subtitle">Agregar nuevo producto</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={grabarProducto}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Titulo</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Nombre producto"
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
                    placeholder="Descripcion producto"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Precio</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Precio"
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

export default FormAddProduct;
