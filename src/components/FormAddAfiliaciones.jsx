import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";



const FormAddAfiliaciones = () => {
  const [productos, setProductos] = useState([]);
  const [mascotaId, setMascotaId] = useState("");
  const [productoId, setProductoId] =  useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [fechaRevision, setFechaRevision] = useState("");

  const { id } = useParams();


  useEffect(() => {
    getMascotsById();
  }, []);

  useEffect(() => {
    getProducts()
  }, []);

    useEffect(() => {
    getProducts()
  }, []);


  const getMascotsById = async () => {
    const response = await axios.get(`http://localhost:5000/obtenerUnaMascota/${id}`);
    setMascotaId(response.data.id);
  };

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/obtenerProductos");
    setProductos(response.data);
  };


  const grabarAfiliación = async (req, res) => {
    try {
      await axios.post(`http://localhost:5000/crearAfiliacion/${id}`, {
        mascotaId: mascotaId,
        productoId: productoId,
        descripcion: descripcion,
        fechaRevision: fechaRevision,
        usuarioId: req.usuarioId
      });
      navigate("/dashboard/afiliaciones");
    } catch (error) {
    res.json(error.message);
    }
  };


  return (
    <>
      <h1 className="title">Afiliaciones</h1>
      <h2 className="subtitle">Lista de afiliaciones</h2>

      <form onSubmit={grabarAfiliación}>
        <div className="mt-2">
          <div className="mt-2">
            <input type="text" value={mascotaId} 
            onChange={(e)=>setMascotaId(e.target.value)}/>
          </div>
        </div>
        <div className="mt-2">
          <div className="select">
            <select onChange={(e)=>setProductoId(e.target.value)}>
              {
                productos.map((product)=>(
                  <option key={product.UUID} value={Number(product.id)}>{product.descripcion}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="mt-2">
          <textarea className="textarea" 
          placeholder="e.g. Hello world"
          value={descripcion}
          onChange={(e)=>setDescripcion(e.target.value)}>
            Ingrese una descripcion
          </textarea>
        </div >
        <div className="mt-2">
            <input type="date" value={fechaRevision} 
            onChange={(e)=>setFechaRevision(e.target.value)}/>
        </div>
        <div className="mt-2 ">
        <button type="submit" className="button is-success"
     >
                Grabar
                  </button>
        </div>
      </form>

    </>
  );
};

export default FormAddAfiliaciones;
