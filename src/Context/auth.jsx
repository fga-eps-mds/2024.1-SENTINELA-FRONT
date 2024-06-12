import React, { createContext, useContext, useEffect, useState } from "react";
import { userLogin } from '../Services/userService';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const email = "fulano@example.com"
  const password = "1234"
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      // api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  const Login = async () => {
    const response = await userLogin(email, password)

    console.log(response);
    setUser(response.data);
    localStorage.setItem('@App:user', JSON.stringify(response.data));
    localStorage.setItem('@App:token', "TOKEN");
    // api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  }

  // ### Auth return
  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
