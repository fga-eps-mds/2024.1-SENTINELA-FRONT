import { createContext, useContext, useEffect, useState } from "react";
import { userLogin } from "../Services/userService";
import PropTypes from "prop-types";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  const Login = async (email, password) => {
    try {
      const response = await userLogin(email, password);
      setUser(response.data);
      localStorage.setItem("@App:user", JSON.stringify(response.data.user));
      localStorage.setItem("@App:token", JSON.stringify(response.data.token));
      return false;
    } catch (err) {
      return true;
    }
  };

  const Logout = async () => {
    setUser(null);

    localStorage.removeItem("@App:user");
    localStorage.removeItem("App:token");
  };

  // ### Auth return
  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
