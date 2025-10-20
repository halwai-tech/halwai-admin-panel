import { publicUserApi } from "./config";

export const userController={
    getAllUsers:async (page=1,limit=10)=>{
        try{
            let result =await publicUserApi.get("/",{
                params:{
                    page,
                    limit
                }
            });
            return result;

        }
        catch(error){
            throw error;
        }

    },
getUsersByRoles: async (role: string, page = 1, limit = 10) => {
  try {
    const result = await publicUserApi.get(`/${role}`, {
      params: { page, limit }
    });
    return result;
  } catch (error) {
    throw error;
  }
}

}