import axios from "axios";

const baseUserURL = import.meta.env.VITE_USER_DB_URL;

const APIUsers = axios.create({
  baseURL: baseUserURL,
});

export { APIUsers, baseUserURL };
