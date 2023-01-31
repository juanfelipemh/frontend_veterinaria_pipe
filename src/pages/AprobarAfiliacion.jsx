import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormAprobarAfiliacion from '../components/FormAprobarAfiliacion';
import { getMe } from '../features/authSlice';
import Layout from './Layout';

const AprobarAfiliacion = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // El único con acceso a los "users" sería el admin. 
  useEffect(() => {
    if (isError) {
      navigate("/dashboard");
    }
    if (user && user.rol !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  

    // Tener presente que el "Layout" almacena la vistas de navegación principales, por lo que dentro de estas etiquetas se incluyen las demás pantallas. Renderiza la pantalla "FormAddUser"
  return (
    <Layout>
      <FormAprobarAfiliacion />
    </Layout>
  );
}

export default AprobarAfiliacion