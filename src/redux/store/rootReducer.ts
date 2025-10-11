import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import toastReducer from "../slices/toastSlice";

const rootReducer=combineReducers({
    toast:toastReducer,
    auth:authReducer
});

export type RootState=ReturnType<typeof rootReducer>;
export default rootReducer;