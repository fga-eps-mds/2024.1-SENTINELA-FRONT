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

export const createSupplierForm = async (benefitsData) => {
  try {
    await APIBank.post(`/SupplierForm/create`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      benefitsData: benefitsData,
    });

    return false;
  } catch (error) {
    alert("Erro ao cadastrar fornecedor");
    return true;
  }
};

export const getSupplierForm = async () => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIBank.get("/supplier", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fornecedor:", error);
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

export const updateSupplierFormById = async (id, benefitsData) => {
  try {
    const response = await APIBank.patch(`/SupplierForm/update/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      benefitsData: benefitsData,
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