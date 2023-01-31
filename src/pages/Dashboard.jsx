import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // "isError" viene del "initialState" tomado de "authSlice", y con el "useSelector" tomamos el "state" que queremos aplicar. En este caso "auth" porque estamos autenticando usuarios para su ingreso
  const { isError } = useSelector((state) => state.auth);

  // Se valida que el usuario ingresado este autenticado y conserva la sesión
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Si el usuario no está autenticado, vuelve a la página inicio "Login" y no permite que se visualicen las demás vistas
  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  // Tener presente que el "Layout" almacena la vistas de navegación principales, por lo que dentro de estas etiquetas se incluyen las demás pantallas. Renderiza la pantalla "Welcome" y esta se muestra como principal luego de iniciar sesión
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;
