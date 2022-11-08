import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import addAvatar from '../img/addAvatar.png';
import { auth,storage,db } from '../firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authAction } from '../context/authSlice';
import { doc, setDoc } from "firebase/firestore"; 
const Register = () => {
    const navigate=useNavigate();
  const dispatch=useDispatch()
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const name=e.target[0].value;
        const email=e.target[1].value;
        const password=e.target[2].value;
        const photos=e.target[3].files[0] 
        console.log(photos);
      try{ 
        const data= await createUserWithEmailAndPassword(auth,email,password);
        const date=new Date().getTime();
        const storageRef=ref(storage,`${name + date}`);
        await uploadBytes(storageRef,photos).then((snapshot)=>{
            getDownloadURL(storageRef).then(async(url)=>{
                if(!photos){
                    await updateProfile(data.user,{displayName:name,photoURL:"https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"});
                    navigate('/login');
                    setDoc(doc(db,"user",data.user.uid),{
                      uid:data.user.uid,
                      displayName:name,
                      email:email,
                      photoURL:"https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                    })
                     setDoc(doc(db,"userChat",data.user.uid),{
                      
                    })
                }
                else{
                      await updateProfile(data.user,{displayName:name,photoURL:url}); 
                      navigate('/login');
                       setDoc(doc(db,"user",data.user.uid),{
                        uid:data.user.uid,
                        displayName:name,
                        email:email,
                        photoURL:url
                      })
                      setDoc(doc(db,"userChat",data.user.uid),{
                        
                      })

                }
                
           
               
            });
     
        
        });
      
        
      
        
      }catch(err){
        console.log(err)
      }
    }
   
  return (
    <div className='w-[400px] bg-white absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg p-3 text-center'>
    <h2 className='text-2xl font-bold text-blue-500'>Lama Chat</h2>
    <p className='text-[15px] text-gray-500 my-5'>Register</p>
    <form className='flex flex-col items-center ' onSubmit={handleSubmit}>
        
        <input type='text' placeholder='Display Name' className='w-[300px] h-[50px]  px-5  border-b-[1px] border-gray-600  mb-3' />
        <input type='email' placeholder='Email' className='w-[300px] h-[50px]  px-5  border-b-[1px] border-gray-600  mb-3' />
        <input type='password' placeholder='Password' className='w-[300px] h-[50px]  px-5  border-b-[1px] border-gray-600  mb-3'/>
        <label className='' >
        <input type='file' className='hidden' />
        <div className='flex items-center gap-3'>
            <img src={addAvatar} alt='' className='w-[30px] h-[30px]' />
            <p className='text-xs text-blue-400'>Add an avatar</p>
        </div>
        </label>
        <button className='w-[300px] h-[40px] bg-[#2a5ec0] text-white rounded-md my-3'>Sign in</button>
    </form>
    <div className='text-[15px] text-gray-700 font-medium'>You don't have an account? <Link to='/login' className='underline decoration-1 decoration-blue-800 text-blue-500 '> Login</Link></div>
</div>  
  )
}

export default Register