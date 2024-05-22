import React, { createContext } from "react";
import PropTypes from "prop-types";
import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
const email = "fulano@example.com"
const password = "12345"

  const Login = async() => {
    const response = await api.post("api/users/login", {
      email, password
    });

    console.log(response);
  }
  return (
    <AuthContext.Provider value={{ signed: true, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.array.isRequired,
};

export default AuthContext;
