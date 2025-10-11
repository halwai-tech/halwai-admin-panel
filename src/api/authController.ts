import { authApi } from "./config";
import {IRegisterUser, ILoginUser} from "@/utils/typeDef.js";

export const authController={
    registerUser: async (data:IRegisterUser)=>{
           try{
                let result=await authApi.post("/register",data);
                return result;
           }
           catch(error){
            throw error;
           }
    },

    loginUser: async (data:ILoginUser)=>{
        try{
               let result=await authApi.post("/login",data);
               return result;
        }
        catch(error){
            throw error;
        }
    }

}