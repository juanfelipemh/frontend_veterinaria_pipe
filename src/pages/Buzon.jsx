import React, { useEffect } from 'react'
import Layout from "./Layout";
import BuzonList from '../components/BuzonList'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Buzon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(()=>{
        dispatch(getMe())
    }, [dispatch]);

    useEffect(()=>{
        if(isError){
            navigate("/login");
        }
        if(user && user.rol !== "admin"){
            navigate("/dashboard")
        }
    }, [isError, user, navigate]);

  return (
    <Layout>
        <BuzonList/>
    </Layout>
  )
}

export default Buzon