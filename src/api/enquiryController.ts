import { publicEnquiryApi } from "./config";

export const enquiryController={
    getAllEnquiry: async (domesticPage=1, monthlyPage=1, professionalPage=1,limit=5)=>{
        try{
          const result=await publicEnquiryApi.get(`/all-enquiry?domesticPage=${domesticPage}&monthlyPage=${monthlyPage}&professionalPage=${professionalPage}&limit=${limit}`);
          return result;
        }
        catch(error){
            throw error;
        }
    }
}