import axios from 'axios';

const baseUserURL = "http://localhost:3001/"
const baseBankURL = "..."

const APIUsers = axios.create({
    baseURL: baseUserURL,
});

export {
    APIUsers
}