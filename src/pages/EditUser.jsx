import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditUser from "../components/FormEditUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditUser = () => {
   // Dashboard tiene la explicación de este código
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // El único con acceso a los "users" sería el admin. 
  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.rol !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

    // Tener presente que el "Layout" almacena la vistas de navegación principales, por lo que dentro de estas etiquetas se incluyen las demás pantallas. Renderiza la pantalla "FormEditUser"
  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
