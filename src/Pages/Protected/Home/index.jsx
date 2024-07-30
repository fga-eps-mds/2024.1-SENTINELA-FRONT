import { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const profileUpdate = () => {
    navigate("/profileupdate");
  };

  return (
    user && (
      <div>
        <h1>Home</h1>
        <div>Bem vindo {user.nomeCompleto}</div>
        <button onClick={profileUpdate}> ATUALIZAR</button>
      </div>
    )
  );
};

export default Home;
