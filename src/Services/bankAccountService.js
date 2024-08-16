import { APIBank } from "./BaseService";

const storagedToken = localStorage.getItem("@App:token");
let token = null;

if (storagedToken) {
  try {
    token = JSON.parse(storagedToken);
  } catch (error) {
    console.error("O token armazenado não é um JSON válido:", error);
  }
}

export async function createBankAccount(formData) {
  try {
    const response = await APIBank.post(
      "finance/createBankAccount",
      { formData },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      return { status: 500, data: { error: "Erro desconhecido" } };
    }
  }
}
export async function listBankAccount(name) {
  try {
    const response = await APIBank.get("/finance/bankAccount", {
      params: { name },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getBankAccount(id) {
  try {
    const response = await APIBank.get(`/finance/bankAccount/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteBankAccount(id) {
  try {
    const response = await APIBank.delete(`/finance/deleteBankAccount/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateBankAccount(id, formData) {
  try {
    const response = await APIBank.patch(
      `/finance/updateBankAccount/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
