import React from 'react'
import { useState } from 'react'
import { collection, query, where, getDoc,setDoc,doc,getDocs,serverTimestamp,updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useEffect } from 'react';
import Chat from './Chat';
import {useSelector} from 'react-redux';
const Chats = () => {
  const user=useSelector((state)=> state.auth.user);
  const [text,setText]=useState('');
  const [data,setData]=useState(null);

  const handleSearch=async()=>{
    setData(null);
    const q=query(collection(db,"user"),where("displayName","==",text));
    const querySnapshot = await getDocs(q);
    const dock=[];
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  dock.push(doc.data());
});
setData(dock);
  }
  const handleKey=(e)=>{
  if(e.code=="Enter"){
    
    handleSearch();
  }
}
const handleAdd=async(friend)=>{
  const conbindedId=user.uid > friend.uid ? 
  user.uid + friend.uid : 
  friend.uid + user.uid; 
 console.log(conbindedId);
  try{
    const querySnapshot=await getDoc(doc(db,"chats",conbindedId));
  if(!querySnapshot.exists()){
    const ref=doc(db,"chats",conbindedId)
      await setDoc(ref,{message:[]});
      await updateDoc(doc(db,'userChat',user.uid),{
        [conbindedId + ".userInfo"]:{
          displayName:friend.displayName,
          photoURL:friend.photoURL,
          uid:friend.uid
        },
        [conbindedId + ".date"]:serverTimestamp()
      })
      await updateDoc(doc(db,'userChat',friend.uid),{
        [conbindedId + ".userInfo"]:{
          displayName:user.displayName,
          photoURL:user.photoURL,
          uid:user.uid
        },
        [conbindedId + ".date"]:serverTimestamp()
      })
  }
  }catch(err){
    console.log(err)
  }
  setData(null);
  setText("");
}

  return (
    <div className='w-full bg-slate-600 h-[530px] overflow-hidden'>
        <input type='text' placeholder='find a user' value={text} onChange={(e)=> setText(e.target.value)} className='border-b-[1px] p-2 placeholder:text-lg w-full bg-transparent text-white outline-none' onKeyDown={handleKey}/>
        <div className='flex flex-col gap-4 px-3 mt-2 text-white'>
          {!data ? "" :data.map((item,index)=>{
            const {displayName,email,photoURL,uid}=item;
            return(
              <div key={uid} className='flex items-center justify-between'>
                <img src={photoURL} alt='' className='w-[40px] h-[40px] object-cover rounded-full' />
                <div >
                <div className='text-white'>{displayName}</div>
                <div className='w-[150px] overflow-hidden text-ellipsis text-xs  '>{email}</div>
                </div>
                <button className='w-[40px] bg-indigo-500 py-1 rounded-md' onClick={()=> handleAdd(item)}>Add</button>
                
              </div>
            )
          })}
        </div>
        <div>
          <Chat />
          </div>
    </div>
  )
}

export default Chats