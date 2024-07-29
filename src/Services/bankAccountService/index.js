import {
    APIBank,
    APIUsers
} from "../BaseService"


export async function createBankAccount(formData) {
  try {
    // Envia a requisição POST com formData diretamente
    const response = await APIBank.post('finance/createBankAccount', { formData });
    return response; // Retorna o objeto de resposta completo
} catch (error) {
    // Se o erro tiver uma resposta, retorne-a
    if (error.response) {
        console.log(error.response.data.error);
        return error.response; // Retorna a resposta do erro
    } else {
        // Caso contrário, retorne um erro genérico
        console.log('Erro desconhecido:', error.message);
        return { status: 500, data: { error: 'Erro desconhecido' } }; 
    }
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
      const response = await APIBank.patch(`/finance/updateBankAccount/${id}`, formData);
      return response.data;
  } catch (error) {
      return error.response.data;
  }
}