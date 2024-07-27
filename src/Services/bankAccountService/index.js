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

export async function listBankAccount(name) {
  try {
      // Incluindo 'name' como um parâmetro de consulta na URL
      const response = await APIUsers.get("/finance/bankAccount", {
          params: { name } // Corrigido para passar 'name' como parâmetro de consulta
      });
      return response.data;
  } catch (error) {
      return error.response.data;
  }
}