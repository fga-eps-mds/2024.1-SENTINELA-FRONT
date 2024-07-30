import "./index.css";
import LabeledTextField from "../../../Components/LabeledTextField";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import UnderlinedTextButton from "../../../Components/UnderlinedTextButton";
import { useState, useContext, useEffect } from "react";
import AuthContext, { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import Card from "../../../Components/Card";

export default function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(""); // Adiciona um estado para mensagens de erro

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setError("");

    const message = await context.Login(email, senha);

    console.log(message);

    if (message) {
      alert("erro de login. Senha ou email incorretos.");
    } else {
      navigate("/home");
    }
  };

  const handlePasswordRecovery = () => {
    navigate("/passwordrecovery");
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
      window.location.reload();
    }
  }, [user, navigate]);

  return (
    <div className="screen">
      <Card>
        <LabeledTextField
          label="EMAIL"
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabeledTextField
          label="SENHA"
          placeholder="Digite sua senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Exibe a mensagem de erro */}
        <div className="recupera-senha">
          <UnderlinedTextButton
            key="recupera-senha"
            text="Esqueci a senha"
            onClick={() => handlePasswordRecovery()}
          />
        </div>
        <SecondaryButton
          text="Filiar-me ao sindicato"
          maxWidth="400px"
          onClick={() => navigate("/filiacao")}
        />
        <PrimaryButton
          text="Entrar"
          onClick={() => handleLogin()}
          maxWidth="400px"
        />
      </Card>
    </div>
  );
}
