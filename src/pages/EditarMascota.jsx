import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormEditMascota from '../components/FormEditMascota';
import { getMe } from '../features/authSlice';
import Layout from './Layout';

const EditarMascota = () => {
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
        <FormEditMascota/>
    </Layout>
  )
}

export default EditarMascota