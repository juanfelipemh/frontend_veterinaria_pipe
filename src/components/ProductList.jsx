import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/obtenerProductos");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/eliminarProducto/${productId}`);
    getProducts();
  };

  return (
    <div>
      <h1 className="title">Productos</h1>
      <h2 className="subtitle">Lista de productos</h2>
      { user && user.rol === "admin" && (
      <Link to="/dashboard/products/add" className="button is-primary mb-2">
        Agregar Producto
      </Link>
      )}
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nombre producto</th>
            <th>Descripcion</th>
            <th>Precio</th>
            { user && user.rol === "admin" && (
            <th>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.UUID}>
              <td>{index + 1}</td>
              <td>{product.titulo}</td>
              <td>{product.descripcion}</td>
              <td>{product.precio}</td>
              <td>
                { user && user.rol === "admin" && (
                <Link
                  to={`/dashboard/products/edit/${product.UUID}`}
                  className="button is-small is-info m-1"
                >
                  Editar
                </Link>
                )}
                { user && user.rol === "admin" && (
                <button
                  onClick={() => deleteProduct(product.UUID)}
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
    </div>
  );
};

export default ProductList;
