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

export const createBenefitsForm = async (benefitsData) => {
  try {
    await APIBank.post(`/benefits/create`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      benefitsData: benefitsData,
    });

    return false;
  } catch (error) {
    alert("Erro ao cadastrar convênio");
    return true;
  }
};

export const getBenefitsForm = async () => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIBank.get("/benefits", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar convênio:", error);
  }
};

export const getBenefitsFormById = async (id) => {
  try {
    const response = await APIBank.get(`/SupplierForm/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar convênio com ID ${id}:`, error);
  }
};

export const updateBenefitsFormById = async (id, benefitsData) => {
  try {
    const response = await APIBank.patch(`/SupplierForm/update/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      benefitsData: benefitsData,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar convênio com ID ${id}:`, error);
  }
};

export const deleteBenefitsFormById = async (id) => {
  try {
    await APIBank.delete(`/SupplierForm/delete/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar convênio com ID ${id}:`, error);
  }
};
