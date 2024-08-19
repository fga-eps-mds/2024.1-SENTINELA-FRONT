import { APIBank, APIUsers } from "./BaseService";

const storagedUser = localStorage.getItem("@App:user");
const user = JSON.parse(storagedUser);

export async function userLogin(email, password) {
  try {
    const response = await APIUsers.post("login", {
      email,
      password,
    });

    return response;
  } catch (error) {
    return null;
  }
}

export const createSupplierForm = async (supplierData) => {
  try {
    await APIBank.post(`/SupplierForm/create`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
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
        Authorization: `Bearer ${storagedUser.token}`,
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
        Authorization: `Bearer ${user.token}`,
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
