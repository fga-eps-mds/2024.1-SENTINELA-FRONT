import { APIBank } from "./BaseService";

const storagedUser = localStorage.getItem("@App:user");
const user = JSON.parse(storagedUser);

export const createFinancialMovements = async (financialData) => {
  try {
    await APIBank.post(`/financialMovements/create`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      financialData: financialData,
    });

    return false;
  } catch (error) {
    alert("Erro ao cadastrar movimento financeiro");
    return true;
  }
};

export const getFinancialMovements = async () => {
  try {
    const response = await APIBank.get("/financialMovements", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar movimentos financeiros:", error);
  }
};

export const getFinancialMovementsById = async (id) => {
  try {
    const response = await APIBank.get(`/financialMovements/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar movimento financeiro com ID ${id}:`, error);
  }
};

export const updateFinancialMovementsById = async (id, financialData) => {
  try {
    const response = await APIBank.patch(`/financialMovements/update/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      financialData: financialData,
    });
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
    await APIBank.delete(`/financialMovements/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  } catch (error) {
    console.error(`Erro ao deletar movimento financeiro com ID ${id}:`, error);
  }
};
