import { APIBank } from "../BaseService";

const storagedUser = localStorage.getItem("@App:user");
const user = JSON.parse(storagedUser);

export const createFinancialMovements = async (financialMovementsData) => {
  try {
    const response = await APIBank.post(
      `/financialMovements/create`,
      { financialMovementsData },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
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

export const updateFinancialMovementsById = async (
  id,
  financialMovementsData
) => {
  try {
    const response = await APIBank.patch(
      `/financialMovements/update/${id}`,
      { financialMovementsData },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
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
    await APIBank.delete(`/financialMovements/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(`Movimentação financeira com ID ${id} deletada com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar movimento financeiro com ID ${id}:`, error);
  }
};
