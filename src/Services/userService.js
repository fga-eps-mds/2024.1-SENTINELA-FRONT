import { APIUsers } from "./BaseService";

export async function userLogin(email, password) {
  try {
    const response = await APIUsers.post("login", {
      email,
      password,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
