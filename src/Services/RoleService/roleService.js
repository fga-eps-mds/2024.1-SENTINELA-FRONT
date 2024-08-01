import { APIUsers } from "../BaseService";

export const createRole = async (roleData) => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIUsers.post("/role/create", roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar role:", error);
    throw error;
  }
};
