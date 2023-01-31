import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormAddMascota from '../components/FormAddMascota';

import { getMe } from '../features/authSlice';
import Layout from './Layout';

const AddMascota = () => {
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
  
  return (
    <Layout>
    <FormAddMascota />
  </Layout>
  )
}

export default AddMascota