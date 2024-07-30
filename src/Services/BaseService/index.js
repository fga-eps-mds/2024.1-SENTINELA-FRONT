import axios from "axios";

const baseBankURL = "http://localhost:3002/";
const baseUserURL =
  import.meta.env.VITE_USER_DB_URL || "http://localhost:3001/";

const APIUsers = axios.create({
  baseURL: baseUserURL,
});

const APIBank = axios.create({
  baseURL: baseBankURL,
});

export { APIUsers, APIBank };
