import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import LabeledTextField from "../../../Components/LabeledTextField";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import Card from "../../../Components/Card";
import Modal from "../../../Components/Modal";
import { sendRecoveryPassword } from "../../../Services/userService";

export default function PasswordRecovery() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleRecoverypassword = async () => {
    const message = await sendRecoveryPassword(email);
    if (message) {
      setShowModal(true);
    } else {
      alert("erro");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="screen">
      <Card className={"customcard"}>
        <LabeledTextField
          type="text"
          label="EMAIL"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SecondaryButton
          text="Voltar"
          onClick={() => {
            navigate("/");
          }}
          maxWidth="400px"
        />
        <PrimaryButton
          text="Recuperar senha"
          onClick={() => handleRecoverypassword()}
          maxWidth="400px"
        />
      </Card>

      <Modal show={showModal} alertTitle="Solicitação enviada!" width="270px">
        <SecondaryButton text="Ok" onClick={() => closeModal()} />
      </Modal>
    </div>
  );
}
