import React from 'react'
import {MdAttachFile} from 'react-icons/md';
import {BsFillImageFill} from 'react-icons/bs'
import { useState } from 'react';
import { useEffect } from 'react';
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { storage,db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import {useSelector} from 'react-redux';
import {updateDoc,doc,Timestamp,arrayUnion} from 'firebase/firestore';
const Input = () => {
    const userID=useSelector((state)=> state.auth.userID);
    const userFocus=useSelector((state)=> state.auth.userFocus);
    const user=useSelector((state)=> state.auth.user);
    const [text,setText]=useState('');
    
    const [image,setImage]=useState(null);
    const SendMessage=async(e)=>{
        try{
            const textNew=text;
            const ImgNew=image;
            setImage(null);
            setText("");
        e.preventDefault();
        if(ImgNew){
            const storageRef=ref(storage,uuidv4());
           const uploadTask= uploadBytesResumable(storageRef,ImgNew);
            uploadTask.on(
                (err)=>{
                    console.log(err)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(async(url)=>{
                        await updateDoc(doc(db,'chats',userID),{
                            message:arrayUnion({
                                date:Timestamp.now(),
                                id:uuidv4(),
                                senderId:user.uid,
                                text:textNew,
                                img:url
                            })
                        })
                    })
                }
            )
        }
        else{
            await updateDoc(doc(db,'chats',userID),{
                message:arrayUnion({
                    date:Timestamp.now(),
                    id:uuidv4(),
                    senderId:user.uid,
                    text:textNew,
                   
                })
            })
        }
        await updateDoc(doc(db,'userChat',user.uid),{
            [userID + ".lastMessage"]:{
                text:textNew
            },
            [userID + ".date"]:Timestamp.now()
        })
        await updateDoc(doc(db,'userChat',userFocus.uid),{
            [userID + ".lastMessage"]:{
                text:textNew
            },
            [userID + ".date"]:Timestamp.now()
        });
      
     }catch(err){
        console.log(err);
     }
     
    }
   
  return (
    <form className='w-full h-[100px] flex-1 bg-white flex items-center justify-between px-5' onSubmit={SendMessage}>
        <input type='text' placeholder='Type something' className='border-none outline-none px-4 w-[60%] text-xl' value={text} onChange={(e)=> setText(e.target.value)}/>
        <div className='flex gap-6 items-center '>
        <div className='text-2xl'><MdAttachFile /></div>
        <label className='text-2xl'><input type='file' className='hidden' onChange={(e)=>setImage(e.target.files[0])}/><BsFillImageFill /> </label>
        <button className='w-[80px] h-[40px] bg-blue-500 text-white rounded-md'>Send</button>
        </div>
    </form>
  )
}

export default Input