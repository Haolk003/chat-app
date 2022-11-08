import { createSlice } from "@reduxjs/toolkit";
const auth=createSlice({
    name:'auth',
    initialState:{
        user:JSON.parse(localStorage.getItem("userChatApp")),
        userFocus:null,
        userID:null,
    },
    reducers:{
        login(state,action){
            state.user=action.payload;
        },
        logout(state,action){
            state.user=null;
        },
        updateChat(state,action){
            state.userFocus=action.payload;
          state.userID= state.user.uid > 
          action.payload.uid ? 
          state.user.uid + action.payload.uid :
          action.payload.uid + state.user.uid
        }
    }
});
export const authAction=auth.actions;
export default auth;