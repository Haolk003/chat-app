import React from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const Message = ({chat}) => {
  const ref=useRef()
    const user=useSelector((state)=>state.auth.user);
    const [time,setTime]=useState('');
    const GetTime=()=>{
     
      const timeNow=new Date().getTime()/1000;
     
     const secondNow=Math.floor(timeNow-chat.date.seconds);
     console.log(secondNow)
     if(secondNow<60){
      setTime('Mới gửi');
     }
     else if(60<=secondNow && secondNow<3600){
      setTime(`${Math.floor(secondNow/60)} phút trước`);
     }
     else if(3600<=secondNow && secondNow<86400){
       setTime(`${Math.floor(secondNow/3600)} giờ trước`);
     }
     else if(86400<=secondNow && secondNow<604800){
      setTime(`${Math.floor(secondNow/86400)} ngày trước`);
    }    
    else if(604800<=secondNow && secondNow<2592000){
      setTime(`${Math.floor(secondNow/604800)} tuần trước`);
    }    
    else if(2592000<=secondNow && secondNow<31536000){
      setTime(`${Math.floor(secondNow/2592000)} tháng trước`);
    }    
    else{
      setTime(`${Math.floor(secondNow/31536000)} năm trước`);
    }
     
     
    }
    useEffect(()=>{
      ref.current?.scrollIntoView({behavior:"smooth"});
      GetTime();
    },[chat])
  return (
    <div className={`flex flex-col-reverse ${user.uid===chat.senderId ? "items-end  " : "items-start"} px-3`} ref={ref}>
    <div className={` ${user.uid===chat.senderId ? "bg-blue-400  " : "bg-gray-300"} px-2 py-3  my-3 rounded-lg`}>
        
      <div className='items-end'>
        <span>{chat.text}</span>
      
      </div>
    
    </div>
      {chat.img && <img src={chat.img} alt='' className='w-24 h-24 '/>}
    <span className='text-xs'>{time}</span>
    </div>
  )
}

export default Message