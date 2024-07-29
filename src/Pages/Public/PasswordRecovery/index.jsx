import { useState } from "react";
// import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import "./index.css";
import LabeledTextField from "../../../Components/LabeledTextField";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import Card from "../../../Components/Card";
import Modal from "../../../Components/Modal";

export default function PasswordRecovery() {
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const buttons = [
    <SideButton key="login" text="Login" onClick={() => handleLoginPage()} />,
    <SideButton key="filiacao" text="Filiação" />,
    <SideButton key="sobre" text="Sobre" />,
  ];

  return (
    <div className="screen">
      <SideBar buttons={buttons} />
      <Card className={"customcard"}>
        <LabeledTextField
          label="EMAIl"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SecondaryButton
          text="Voltar"
          onClick={() => handleLoginPage()}
          maxWidth="400px"
        />
        <PrimaryButton
          text="Recuperar senha"
          onClick={() => openModal()}
          maxWidth="400px"
        />
      </Card>

      <Modal
        show={showModal}
        onClose={closeModal}
        text="ok"
        width="270px"
      ></Modal>
    </div>
  );
}
