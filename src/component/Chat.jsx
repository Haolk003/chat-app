import React from 'react'
import { db } from '../firebase';
import { doc, getDoc,onSnapshot } from "firebase/firestore";
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { useState } from 'react';
import { authAction } from '../context/authSlice';
const Chat = () => {
    const user=useSelector((state)=> state.auth.user);
    const userFocus=useSelector((state)=> state.auth.userFocus);
    const [list,setList]=useState(null);
    const dispatch=useDispatch();
    const Friend=async()=>{
        try{
            const docRef=doc(db,"userChat",user.uid);
            const docSnap=await getDoc(docRef);
            const data=[];
            if(docSnap.exists()){
               Object.values(docSnap.data()).forEach((item)=>{
                data.push(item.userInfo);
               })
            }
            setList(data);
            }
            catch(err){
                console.log(err);
            }
    }
    useEffect(()=>{
        Friend();
    },[user]);
   
    const handleClick=(item)=>{
        dispatch(authAction.updateChat(item))
    }
   
  return (
    <div className='flex flex-col gap-4 mt-3'>
        {list  && list.map((item)=>{
            return( 
        <div className={`flex items-center gap-4 py-2  hover:bg-slate-300 px-2 ${userFocus && userFocus.uid===item.uid && "bg-slate-300"}` } key={item.uid} onClick={()=>handleClick(item)}>
            <img src={item.photoURL} alt='' className='w-[40px] h-[40px] object-cover rounded-full'  />
            <div className='text-white font-semibold text-lg'>{item.displayName}</div>
        </div>)})}
    </div>
  )
}

export default Chat