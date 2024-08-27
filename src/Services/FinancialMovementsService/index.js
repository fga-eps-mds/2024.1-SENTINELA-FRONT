import { APIBank } from "../BaseService";

export const createFinancialMovements = async (financialMovementsData) => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIBank.post(
      `/financialMovements/create`,
       financialMovementsData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao cadastrar movimentação financeira:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFinancialMovements = async () => {
  const token = localStorage.getItem("@App:token");
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await APIBank.get("/financialMovements", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar movimentos financeiros:", error);
  }
};

export const getFinancialMovementsById = async (id) => {
  const token = localStorage.getItem("@App:token");
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await APIBank.get(`/financialMovements/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar movimento financeiro com ID ${id}:`, error);
  }
};

export const updateFinancialMovementsById = async (
  id,
  financialMovementsData
) => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIBank.patch(
      `/financialMovements/update/${id}`,
       financialMovementsData ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao atualizar movimento financeiro com ID ${id}:`,
      error
    );
    throw error;
  }
};

export const deleteFinancialMovementsById = async (id) => {
  const token = localStorage.getItem("@App:token");
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await APIBank.delete(`/financialMovements/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar movimento financeiro com ID ${id}:`, error);
    throw error;
  }
};
