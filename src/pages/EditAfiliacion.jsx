import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormEditAfiliacion from '../components/FormEditAfiliacion';
import { getMe } from '../features/authSlice';
import Layout from './Layout';

const EditAfiliacion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        navigate("/dashboard");
      }
    }, [isError, navigate]);

  return (
    <Layout>
        <FormEditAfiliacion/>
    </Layout>
  )
}

export default EditAfiliacion