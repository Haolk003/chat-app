import React from 'react'
import {FaVideo,FaUserPlus} from 'react-icons/fa';
import {SlOptions} from 'react-icons/sl'
import { useSelector } from 'react-redux';
const Tool = () => {
  const userFocus=useSelector((state)=> state.auth.userFocus);
  return (
    <div className=' flex-shrink-0 h-[70px] w-full flex items-center justify-between bg-indigo-600 gap-4 px-4 text-white'>
    {userFocus &&  <div className='flex items-center gap-4'>
        <img src={userFocus.photoURL} alt='' className='w-[40px] h-[40px] object-cover rounded-full' />
        <p>{userFocus.displayName}</p>

      </div>}
      <div className='flex items-center gap-5'>
       <div><FaVideo /></div> 
    <div><FaUserPlus/></div>
    <div><SlOptions /></div>
    </div>
    </div>
  )
}

export default Tool