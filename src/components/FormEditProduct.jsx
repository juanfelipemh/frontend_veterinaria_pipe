import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Toma el id enviado a la URL

  // Traer los datos del ID seleccionado. Esto toma parametro del useParams
  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/obtenerUnProducto/${id}`
        );
        setTitulo(response.data.titulo);
        setDescripcion(response.data.descripcion);
        setPrecio(response.data.precio);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  // Función para actualizar producto. Se agrega al <form> para que envie al servidor una vez presionado el boton tipo <submit>
  const actualizarProducto = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/actualizarProducto/${id}`, {
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
            <form onSubmit={actualizarProducto}>
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

export default FormEditProduct;
