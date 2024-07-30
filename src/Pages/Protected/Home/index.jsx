import { useContext, useEffect } from "react";
import AuthContext, { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleLogout = () => {
    navigate("/");
    context.Logout();
  };

  useEffect(() => {}, [user]);

  const profileUpdate = () => {
    navigate("/profileupdate");
  };

  return (
    user && (
      <div>
        <h1>Home</h1>
        <div>Bem vindo {user.nomeCompleto}</div>

        <button onClick={handleLogout}> SAIR </button>
        <button onClick={profileUpdate}> ATUALIZAR</button>
      </div>
    )
  );
};

export default Home;
