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
