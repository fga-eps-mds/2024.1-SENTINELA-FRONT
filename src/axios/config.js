import axios from "axios";

const sentinelaaxios = axios.create({
  baseURL: "https://localhost:3001",
});

export default sentinelaaxios;
