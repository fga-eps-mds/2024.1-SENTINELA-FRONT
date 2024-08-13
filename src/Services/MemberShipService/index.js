import { APIUsers } from "../BaseService";

export async function createMemberShip(formData) {
  try {
    const response = await APIUsers.post("membership/create", {
      formData,
    });
    return response.status;
  } catch (error) {
    return error.response.data.erro;
  }
}

export async function getMemberShip(status) {
  try {
    const response = await APIUsers.get("membership", {
      params: { status: status },
    });
    return response.data;
  } catch (error) {
    return error.response.data.erro;
  }
}

export async function getMemberShipById(id) {
  try {
    const response = await APIUsers.get(`membership/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data.erro;
  }
}

export const updateMemberStatus = async (memberId) => {
  try {
    const response = await APIUsers.patch(
      `membership/updateStatus/${memberId}`
    );
    return response.data;
  } catch (error) {
    return error.response ? error.response.data.error : "An error occurred";
  }
};

export async function deleteMember(memberId) {
  try {
    const response = await APIUsers.delete(`membership/delete/${memberId}`);
    return response.data;
  } catch (error) {
    return error.response.data.erro;
  }
}
