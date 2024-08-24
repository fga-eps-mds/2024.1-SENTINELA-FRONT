import axios from "axios";

const baseBenefitsURL =
  import.meta.env.VITE_BENEFIT_DB_URL || "http://localhost:3003/";
const baseBankURL =
  import.meta.env.VITE_BANK_DB_URL || "http://localhost:3002/";
const baseUserURL =
  import.meta.env.VITE_USER_DB_URL || "http://localhost:3001/";

const APIUsers = axios.create({
  baseURL: baseUserURL,
});

const APIBank = axios.create({
  baseURL: baseBankURL,
});

const APIBenefits = axios.create({
  baseURL: baseBenefitsURL,
});

export { APIUsers, APIBank, APIBenefits };
