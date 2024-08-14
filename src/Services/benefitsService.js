import { APIBenefits, APIUsers } from "./BaseService";

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
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("Token não encontrado");
    }

    await APIBenefits.post(`/benefits/create/`, benefitsData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return false;
  } catch (error) {
    console.error(
      "Erro ao cadastrar benefício:",
      error.response ? error.response.data : error.message
    );
    alert("Erro ao cadastrar benefício");
    return true;
  }
};

export const getBenefitsForm = async () => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIBenefits.get("/benefits", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar benefício:", error);
  }
};

export const getBenefitsFormById = async (id) => {
  try {
    const response = await APIBenefits.get(`/benefits/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar benefício com ID ${id}:`, error);
  }
};

export const updateBenefitsFormById = async (id, benefitsData) => {
  try {
    const response = await APIBenefits.patch(`/benefits/update/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      benefitsData: benefitsData,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar benefício com ID ${id}:`, error);
  }
};

export const deleteBenefitsFormById = async (id) => {
  try {
    await APIBenefits.delete(`/benefits/delete/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar benefício com ID ${id}:`, error);
  }
};
