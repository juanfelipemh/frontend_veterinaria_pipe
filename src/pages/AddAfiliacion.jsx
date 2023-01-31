import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormAddAfiliaciones from '../components/FormAddAfiliaciones';
import { getMe } from '../features/authSlice';
import Layout from './Layout';

const AddAfiliacion = () => {
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
 
     // Tener presente que el "Layout" almacena la vistas de navegación principales, por lo que dentro de estas etiquetas se incluyen las demás pantallas. Renderiza la pantalla "FormAddProduct"
   return (
     <Layout>
       <FormAddAfiliaciones />
     </Layout>
   );
 };

export default AddAfiliacion