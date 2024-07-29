import SideBar from "../../../Components/SideBar";
import "./index.css";
import { useNavigate } from "react-router-dom";

import LabeledTextField from "../../../Components/LabeledTextField";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import Modal from "../../../Components/Modal";
import SideButton from "../../../Components/SideButton";
import { useState } from "react";
import Card from "../../../Components/Card";

export default function ChangePassword() {
  const [senha, setSenha] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/");
  };
  const openModal = () => {
    setShowModal(true);
  };

  const buttons = [
    <SideButton itemKey="login" key="login" text="Login" />,
    <SideButton itemKey="filiacao" key="filiacao" text="Filiação" />,
  ];

  return (
    <div className="screen">
      <SideBar buttons={buttons} />
      <Card>
        <LabeledTextField
          label="SENHA"
          placeholder="Digite sua nova senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <LabeledTextField
          label="CONFIRMAÇÃO DE SENHA"
          placeholder="Digite nova senha para confirmação"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <PrimaryButton
          text="confirmar"
          onClick={() => openModal()}
          maxWidth="400px"
        />
      </Card>

      <Modal
        show={showModal}
        alertTitle="Senha definida"
        maxWidth="270px"
        alert="Faça login usando sua nova senha"
      >
        <SecondaryButton text="Ok" onClick={() => handleLoginPage()} />
      </Modal>
    </div>
  );
}
