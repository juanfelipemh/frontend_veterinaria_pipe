import React, { useEffect } from "react";
import Layout from "./Layout";
import Userlist from "../components/Userlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Users = () => {
   // Dashboard tiene la explicación de este código.
   
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

    // Tener presente que el "Layout" almacena la vistas de navegación principales, por lo que dentro de estas etiquetas se incluyen las demás pantallas. Acá se renderiza la vista de "UserList"
  return (
    <Layout>
      <Userlist />
    </Layout>
  );
};

export default Users;
