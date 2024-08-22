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
