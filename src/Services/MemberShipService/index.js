import { APIUsers } from "../BaseService";

export async function createMemberShip(formData) {
  try {
    await APIUsers.post("membership/create", {
      formData,
    });
  } catch (error) {
    return error.response.data.erro;
  }
}


export async function getMemberShip() {
  try {
    const response = await APIUsers.get("membership/request");
    return response.data;
  } catch (error) {
    return error.response.data.erro;
  }
}

export const updateMemberStatus = async (memberId) => {
  try {
    const response = await APIUsers.patch(`membership/updateStatus/${memberId}`);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data.error : 'An error occurred';
  }
};


