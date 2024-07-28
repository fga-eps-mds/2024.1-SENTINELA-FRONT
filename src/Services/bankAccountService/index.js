import {
    APIBank,
    APIUsers
} from "../BaseService"


export async function createBankAccount (formData) {
    try {
        const response = await APIBank.post('finance/createBankAccount', {
         
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
      const response = await APIBank.get("/finance/bankAccount", {
          params: { name } // Corrigido para passar 'name' como parâmetro de consulta
      });
      return response.data;
  } catch (error) {
      return error.response.data;
  }
}

export async function getBankAccount(id) {
  try {
      const response = await APIBank.get(`/finance/bankAccount/${id}`);
      return response.data;
  } catch (error) {
      return error.response.data;
  }
}

export async function deleteBankAccount(id) {
  try {
      const response = await APIBank.delete(`/finance/deleteBankAccount/${id}`);
      return response.data;
  } catch (error) {
      return error.response.data;
  }
}

export async function updateBankAccount(id, formData) {
  try {
      const response = await APIBank.patch(`/finance/updateBankAccount/${id}`, {
          formData
      });
      return response.data;
  } catch (error) {
      return error.response.data;
  }
}