import React, { createContext } from "react";
import PropTypes from "prop-types";
import { userLogin } from '../Services/userService';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
const email = "fulano@example.com"
const password = "1234"

  const Login = async() => {
    const user = await userLogin(email, password)

    console.log(user);
  }
  return (
    <AuthContext.Provider value={{ signed: true, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
