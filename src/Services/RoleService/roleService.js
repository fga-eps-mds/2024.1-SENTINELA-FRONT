import { APIUsers } from "../BaseService";

const storagedUser = localStorage.getItem("@App:user");
let user = null;

if (storagedUser) {
  try {
    user = JSON.parse(storagedUser);
  } catch (error) {
    console.error("Erro ao armazenar usuário: ", error);
  }
}

export const createRole = async (roleData) => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await APIUsers.post("/role/create", roleData, {
      params: {
        userId: `${user._id}`,
        moduleName: "users",
        action: "create",
      },
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
      params: {
        userId: `${user._id}`,
        moduleName: "users",
        action: "update",
      },
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
      params: {
        userId: `${user._id}`,
        moduleName: "users",
        action: "delete",
      },
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
