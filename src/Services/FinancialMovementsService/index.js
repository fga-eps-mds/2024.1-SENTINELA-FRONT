import { APIBank } from "../BaseService";

const storagedToken = localStorage.getItem("@App:token");
let token = null;

if (storagedToken) {
  try {
    token = JSON.parse(storagedToken);
  } catch (error) {
    console.error("O token armazenado não é um JSON válido:", error);
  }
}

export const createFinancialMovements = async (financialMovementsData) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await APIBank.post(
      `/financialMovements/create`,
      { financialMovementsData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Requisição bem-sucedida:", response.data);
    return false;
  } catch (error) {
    console.error(
      "Erro ao cadastrar movimentação financeira:",
      error.response?.data || error.message
    );
    return true;
  }
};

export const getFinancialMovements = async () => {
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
    if (!token) {
      throw new Error("No token found");
    }

    const response = await APIBank.patch(
      `/financialMovements/update/${id}`,
      { financialMovementsData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Movimentação financeira atualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao atualizar movimento financeiro com ID ${id}:`,
      error
    );
  }
};

export const deleteFinancialMovementsById = async (id) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }

    await APIBank.delete(`/financialMovements/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Movimentação financeira com ID ${id} deletada com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar movimento financeiro com ID ${id}:`, error);
  }
};
