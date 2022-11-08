import { authAction } from "./authSlice";
export const sendCartAuth=(user)=>{
    return async(dispatch)=>{
       const request=()=>{
        localStorage.setItem("userChatApp",JSON.stringify(user))
       }
        try{
             await request();
        }catch(err){
            console.log(err.message);
        }
    }
}

