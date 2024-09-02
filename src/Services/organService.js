import { APIUsers } from "./BaseService";

const storagedUser = localStorage.getItem("@App:user");
let user = null;

if (storagedUser) {
  try {
    user = JSON.parse(storagedUser);
  } catch (error) {
    console.error("Erro ao armazenar usuário: ", error);
  }
}

export async function createOrgan(orgao, lotacao) {
  try {
    const response = await APIUsers.post(
      "organ/create",
      { orgao, lotacao },
      {
        params: {
          userId: `${user._id}`, // Substitua user._id pela forma correta de obter o ID do usuário
          moduleName: "users",
          action: "create",
        },
      }
    );
    return response.status;
  } catch (error) {
    console.error("Erro ao criar órgão:", error);
    throw error;
  }
}

export async function listOrgans() {
  try {
    const response = await APIUsers.get("organ/list");
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
}
export async function updateOrgan(id, updatedData) {
  try {
    const response = await APIUsers.patch(
      `organ/update/${id}`,
      { updatedData },
      {
        params: {
          userId: `${user._id}`, // Substitua user._id pela forma correta de obter o ID do usuário
          moduleName: "users",
          action: "update",
        },
      }
    );
    return response.status;
  } catch (error) {
    return error.response.data.error;
  }
}

export async function getOrganById(id) {
  try {
    const response = await APIUsers.get(`organ/get/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
}

export async function deleteOrganById(id) {
  try {
    const response = await APIUsers.delete(`organ/delete/${id}`, {
      params: {
        userId: `${user._id}`, // Substitua user._id pela forma correta de obter o ID do usuário
        moduleName: "users",
        action: "delete",
      },
    });
    return response.status;
  } catch (error) {
    return error.response.data.error;
  }
}
