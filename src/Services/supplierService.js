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

export const createSupplierForm = async (supplierData) => {
  try {
    await APIBank.post(`/SupplierForm/create`, {
      headers: {
        Authorization: `Bearer ${storagedToken}`,
      },
      supplierData: supplierData,
    });

    return false;
  } catch (error) {
    return true;
  }
};

export const getSupplierForm = async () => {
  try {
    const response = await APIBank.get(`/SupplierForm`, {
      headers: {
        Authorization: `Bearer ${storagedToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error);
  }
};

export const getSupplierFormById = async (id) => {
  try {
    const response = await APIBank.get(`/SupplierForm/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar fornecedor com ID ${id}:`, error);
  }
};

export const updateSupplierFormById = async (id, supplierData) => {
  try {
    const response = await APIBank.patch(`/SupplierForm/update/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      supplierData: supplierData,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar fornecedor com ID ${id}:`, error);
  }
};

export const deleteSupplierFormById = async (id) => {
  try {
    await APIBank.delete(`/SupplierForm/delete/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar fornecedor com ID ${id}:`, error);
  }
};
