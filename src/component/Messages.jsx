import React from 'react';
import {doc,onSnapshot} from "firebase/firestore";
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Message from './Message';
const Messages = () => {
  const userID=useSelector((state)=> state.auth.userID);
  const [messages,setMessages]=useState(null);
  useEffect(()=>{
    if(userID){
       const unSub=onSnapshot(doc(db,"chats",userID),(doc)=>{
      doc.exists() && setMessages(doc.data().message);
      
    })  
     return ()=>{
      unSub();
    }
    } 
  },[userID]);

  return (
    <div className='  h-[430px] bg-gray-400 w-full overflow-auto'>
      <div className=''>
      {messages && messages.map((item,index)=>{
        return(
          <Message chat={item} key={item.id} />
        )
      })}
      </div>
    </div>
  )
}

export default Messages