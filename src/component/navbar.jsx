import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { authAction } from '../context/authSlice';
const Navbar = () => {
    const dispatch=useDispatch()
    const user=useSelector((state)=> state.auth.user);
    const logout=()=>{
        dispatch(authAction.logout());
    }
  return (
    <div className='w-full h-[70px] flex items-center justify-between bg-indigo-700 p-3 text-white'>
        <h2>Lama Chat</h2>
        <div className='flex items-center gap-2'>
            <img src={user.photoURL} alt={user.photoURL} className='w-[40px] h-[40px] rounded-full object-cover'/>
            <p>{user.displayName}</p>
            <button onClick={logout} className='p-1 text-xs bg-slate-400'>Logout</button>

        </div>
        
    </div>
  )
}

export default Navbar