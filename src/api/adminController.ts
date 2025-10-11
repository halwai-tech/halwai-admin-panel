

import { securedAdminApi, publicAdminApi } from "./config";



export const adminController={
    addEvent:async (data:FormData)=>{
          try{
             const isFormData=data instanceof FormData;
             const config={
                headers:{
                    "Content-Type": isFormData? "multipart/form-data": "application/json"
                }
             };

             let response=await securedAdminApi.post("/add-event",data,config);
             return response;
          }
          catch(error){
            throw error;
          }
    },
    addCategory:async (data:FormData)=>{
        try{
            const isFormData=data instanceof FormData;
            const config={
                headers:{
                    "Content-Type":isFormData? "multipart/form-data": "application/json"
                }
            };

            let response=await securedAdminApi.post("/add-event-category",data,config);
            return response;
        }
        catch(error){
            throw error;
        }

    },
    getAllCategory:async ()=>{
          try{
               const response=await publicAdminApi.get("/all-event-category");
               return response;
          }
          catch(error){
            throw error;
          }
    }

}