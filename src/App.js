import React from 'react'
import Login from './Pages/login';
import {Routes,Route, Navigate} from 'react-router-dom';
import Register from './Pages/register';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Home from './Pages/home';
import {sendCartAuth} from './context/authAction';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
const App = () => {
  const dispatch=useDispatch();

  const users=useSelector((state)=> state.auth.user);
  useEffect(()=>{
    dispatch(sendCartAuth(users));
    console.log(users);
  },[users]); 
  const RequestUser=({children})=>{
    
       if(!users){
      return <Navigate to='/login' /> 
    }
    else{
      return children
    }
    }
  

  return (
    <div className='bg-blue-300 w-full h-screen relative'>
      <Routes>
        <Route path='/' index element={<RequestUser><Home /></RequestUser>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </div>
  )
}

export default App