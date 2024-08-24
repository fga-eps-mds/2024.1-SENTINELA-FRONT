import "./index.css";
import LabeledTextField from "../../../Components/LabeledTextField";
import PrimaryButton from "../../../Components/PrimaryButton";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../../../Components/Card";
import { useNavigate } from "react-router-dom";
import { changePasswordById, verifyToken } from "../../../Services/userService";

export default function ChangePasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loadUserId = async () => {
      if (token) {
        try {
          const response = await verifyToken(token);
          if (response) {
            setUserId(response?.userId);
          } else {
            // Handle invalid token case
            console.error("Token is invalid");
          }
        } catch (error) {
          // Handle error
          console.error("Error verifying token", error);
        }
      }
    };

    loadUserId();
  }, [token]);

  const changePassword = async () => {
    if (password !== confirmPassword) {
      alert("Senhas não são iguais");
      return;
    }
    try {
      const result = await changePasswordById(password, userId);
      if (!result) {
        alert("Senha alterada com sucesso");
        navigate("/");
      } else {
        alert("Erro ao trocar senha");
      }
    } catch (error) {
      console.error("Erro ao trocar senha", error);
    }
  };

  return !userId ? (
    <div> Essa página expirou ou não existe... </div>
  ) : (
    <div className="screen">
      <Card>
        <LabeledTextField
          label="SENHA"
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LabeledTextField
          label="CONFIRMAR SENHA"
          placeholder="Digite sua senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <PrimaryButton
          text="Trocar senha"
          onClick={changePassword}
          maxWidth="400px"
        />
      </Card>
    </div>
  );
}
