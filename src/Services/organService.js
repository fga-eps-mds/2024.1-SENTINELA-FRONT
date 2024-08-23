import { APIUsers } from "./BaseService";

export async function createOrgan(orgao, lotacao) {
  try {
    const response = await APIUsers.post("organ/create", {
      orgao,
      lotacao,
    });
    return response.status;
  } catch (error) {
    return error.response.data.error;
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
    const response = await APIUsers.patch(`organ/update/${id}`, updatedData);
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
    const response = await APIUsers.delete(`organ/delete/${id}`);
    return response.status;
  } catch (error) {
    return error.response.data.error;
  }
}
