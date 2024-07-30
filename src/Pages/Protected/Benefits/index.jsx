import { useContext } from "react";
import AuthContext, { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";

const Benefits = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleLogout = () => {
    context.Logout();
    navigate("/");
  };


  return (
    user && (
      <div>
        <h1>Beneficios</h1>
        <div>TESTANDO AS ROTAS </div>

        <button onClick={handleLogout}> SAIR </button>
    
      </div>
    )
  );
};

export default Benefits;