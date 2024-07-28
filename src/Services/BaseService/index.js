import axios from 'axios';

const baseUserURL = "http://localhost:3001/"
const baseBankURL = "http://localhost:3002/"

const APIUsers = axios.create({
    baseURL: baseUserURL,
});

const APIBank = axios.create({
    baseURL: baseBankURL,
});   

export {
    APIUsers, 
    APIBank
}