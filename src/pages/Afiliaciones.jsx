import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AfiliciacionList from '../components/AfiliciacionList';
import { getMe } from '../features/authSlice';
import Layout from './Layout';

const Afiliaciones = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    // El único con acceso a los "users" sería el admin. 
    useEffect(() => {
      if (isError) {
        navigate("/");
      }
      /* if (user && user.rol !== "admin") {
        navigate("/dashboard");
      } */
    }, [isError, user, navigate]); 
  
  return (
    <Layout>
        <AfiliciacionList/>
    </Layout>
  )
}

export default Afiliaciones