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

export const getAllRoles = async () => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIUsers.get("/role", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar roles:", error);
    throw error;
  }
};

export const getRoleById = async (id) => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIUsers.get(`/role/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar role:", error);
    throw error;
  }
};

export const updateRole = async (id, roleData) => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIUsers.patch(`/role/patch/${id}`, roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar role:", error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIUsers.delete(`/role/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar role:", error);
    throw error;
  }
};
