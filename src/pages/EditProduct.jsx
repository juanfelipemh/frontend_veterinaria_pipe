import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditProduct from "../components/FormEditProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditProduct = () => {
   // Dashboard tiene la explicación de este código
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

    // Tener presente que el "Layout" almacena la vistas de navegación principales, por lo que dentro de estas etiquetas se incluyen las demás pantallas. Renderiza la pantalla "FormEditProduct"
  return (
    <Layout>
      <FormEditProduct />
    </Layout>
  );
};

export default EditProduct;
