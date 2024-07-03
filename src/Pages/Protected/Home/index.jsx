import React, { useContext } from "react";
import { AuthProvider, useAuth } from "../../../Context/auth";
import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

    const { user } = useAuth();

    const handleLogout = () => {
      context.Logout();
      navigate("/")
    };

    return user && (
      <div>
        <h1>Home</h1>
        <div>
            Bem vindo {user.nomeCompleto}
        </div>

        <button text="Entrar" onClick={handleLogout} > SAIR </button>
      </div>
    );
  };

export default Home;