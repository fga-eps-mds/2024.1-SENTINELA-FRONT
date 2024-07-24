import {
    APIUsers
} from "../BaseService"


export async function createMemberShip (formData) {
    try {
        const response = await APIUsers.post('membership/create', {
         
          formData
        });
    
        
    
        

        
      } catch (error) {
        console.log(error.response.data.erro);
        
        return error.response.data.erro;
      }
}