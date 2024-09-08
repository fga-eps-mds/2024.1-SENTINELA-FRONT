import { APIBenefits, APIUsers } from "./BaseService";

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
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");
    let user = null;
    let token = null;

    if (storagedUser) {
      try {
        user = JSON.parse(storagedUser);
      } catch (error) {
        console.error("Erro ao armazenar usuário: ", error);
      }
    }

    if (storagedToken) {
      try {
        token = JSON.parse(storagedToken);
      } catch (error) {
        console.error("O token armazenado não é um JSON válido:", error);
      }
    }

    if (!user || !user._id) {
      throw new Error("Usuário não encontrado ou sem ID.");
    }

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
    const storagedToken = localStorage.getItem("@App:token");
    let token = null;

    if (storagedToken) {
      try {
        token = JSON.parse(storagedToken);
      } catch (error) {
        console.error("O token armazenado não é um JSON válido:", error);
      }
    }
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
    const storagedToken = localStorage.getItem("@App:token");
    let token = null;

    if (storagedToken) {
      try {
        token = JSON.parse(storagedToken);
      } catch (error) {
        console.error("O token armazenado não é um JSON válido:", error);
      }
    }
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIBenefits.patch(`/benefits/update/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
