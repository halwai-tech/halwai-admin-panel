import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState{
    token:string | null;
    isAuthneticated:boolean;
}

const initialState:AuthState={
    token:null,
    isAuthneticated:false
};

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state, action:PayloadAction<string>)=>{
            state.token=action.payload;
            state.isAuthneticated=true;

        },
        logout:(state)=>{
            state.token=null;
            state.isAuthneticated=false;
        }
    }
});

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;