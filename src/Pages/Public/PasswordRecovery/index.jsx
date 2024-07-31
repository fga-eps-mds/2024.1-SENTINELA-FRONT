import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="screen">
      <Card className={"customcard"}>
        <LabeledTextField
          type="text"
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

      <Modal show={showModal} alertTitle="Solicitação enviada!" width="270px">
        <SecondaryButton text="Ok" onClick={() => closeModal()} />
      </Modal>
    </div>
  );
}
