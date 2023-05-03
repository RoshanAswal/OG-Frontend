import {createSlice } from '@reduxjs/toolkit';

const UserSlice=createSlice({
    name:"UserInfo",
    initialState:[],
    reducers:{
        addUserId(state,action){},
        addCookie(state,action){},
        removeUserId(state,action){},
        removeCookie(state,action){}
    },
});

export default UserSlice.reducer;
export const {addUserId}=UserSlice.actions;
export const {addCookie}=UserSlice.actions;
export const {removeUserId}=UserSlice.actions;
export const {removeCookie}=UserSlice.actions;