import React, { createContext, useState } from "react";
import { userLogin } from '../Services/userService';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const email = "fulano@example.com"
  const password = "1234"
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  const Login = async () => {
    const userData = await userLogin(email, password)

    console.log(userData);
    setUserInfo(userData.data);
    localStorage.setItem('@App:user', JSON.stringify(response.data.user));
    localStorage.setItem('@App:token', response.data.token);
    // api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  }

  // ### Auth return
  return (
    <AuthContext.Provider value={{ signed: Boolean(userInfo), userInfo, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
