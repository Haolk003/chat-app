import React from 'react'
import {Link} from 'react-router-dom';
import { auth } from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authAction } from '../context/authSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const email=e.target[0].value;
        const password=e.target[1].value;
        signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            dispatch(authAction.login(userCredential.user));
            navigate('/');
        })
    }
  return (
    <div className='w-[400px] bg-white absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] rounded-sm p-3 text-center'>
        <h2 className='text-2xl font-bold text-blue-500'>Lama Chat</h2>
        <p className='text-[15px] text-gray-500 my-5'>Login</p>
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <input type='email' placeholder='Email' className='w-[300px] h-[50px]  px-5  border-b-[1px] border-gray-600  mb-3' />
            <input type='password' placeholder='Password' className='w-[300px] h-[50px]  px-5  border-b-[1px] border-gray-600  mb-3'/>
            <button className='w-[300px] h-[40px] bg-[#2a5ec0] text-white rounded-md my-3'>Sign in</button>
        </form>
        <div className='text-[15px] text-gray-700 font-medium'>You don't have an account? <Link to='/register' className='underline decoration-1 decoration-blue-800 text-blue-500 '> Register</Link></div>
    </div>  
  )
}

export default Login