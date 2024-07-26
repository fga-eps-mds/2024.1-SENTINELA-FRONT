import {
    APIUsers
} from "../BaseService"


export async function createBankAccount (formData) {
    try {
        const response = await APIUsers.post('finance/createBankAccount', {
         
          formData
        });
        
      } catch (error) {
        console.log(error.response.data.erro);
        
        return error.response.data.erro;
      }
}

export async function listBankAccount () {
    try {
        const response = await APIUsers.get("/finance/listBankAccount")
        return response.data
    } catch (error) {
        return error.response.data
    }
}