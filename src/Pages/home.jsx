import React from 'react'
import {Navbar,Chats,Tool,Messages,Input} from '../component';
const Home = () => {
  return (
    <div className='w-[70%] h-[600px] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#3f2275] border-[1px] border-white rounded-lg '>
        <div className='flex'>
        <div className='w-[30%] flex flex-col'>
        <Navbar />
        <Chats />
        </div>
        <div className='w-[70%] flex flex-col h-[600px] justify-between'>
            <Tool />
            <Messages />
            <Input />
        </div>
        </div>
    </div>
  )
}

export default Home