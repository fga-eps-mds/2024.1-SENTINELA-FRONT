import { APIUsers } from "./BaseService";

// const storagedToken = localStorage.getItem("@App:token");
// const token = JSON.parse(storagedToken);

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
    console.error(error);
    return error.response.data.erro;
  }
}

export const updateMemberStatus = async (memberId, formData) => {
  try {
    const response = await APIUsers.patch(
      `membership/updateStatus/${memberId}`,
      {
        formData,
      }
    );
    return response.data;
  } catch (error) {
    return error.response ? error.response.data.error : "An error occurred";
  }
};

export const updateMembership = async (memberId, formData) => {
  try {
    await APIUsers.patch(`membership/update/${memberId}`, {
      formData,
    });

    return false;
  } catch (error) {
    return error.response.data.erro;
  }
};

export async function deleteMember(memberId) {
  try {
    await APIUsers.delete(`membership/delete/${memberId}`);
    return false;
  } catch (error) {
    return error.response.data.erro;
  }
}
