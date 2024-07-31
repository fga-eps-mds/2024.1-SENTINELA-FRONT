import { useState } from "react";
import "./index.css";
import FieldText from "../../../../Components/FieldText";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import Modal from "../../../../Components/Modal";
import { Checkbox } from "@mui/material";

export default function ProfilePermsCreatePage() {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = () => {
    try {
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseDialog = () => {
    setShowModal(false);
  };

  return (
    <section className="container">
      <div className="forms-container">
        <h1>Cadastro de Perfil</h1>
        <h3>Informações do Perfil</h3>

        <FieldText label="Nome do Perfil" />

        <div className="select-profile">
          <div className="row-labels">
            <label></label>
            <label>Criar</label>
            <label>Editar</label>
            <label>Visualizar</label>
            <label>Deletar</label>
          </div>
          <div className="row">
            <label>Financeiro</label>
            <Checkbox />
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
          <div className="row">
            <label>Benefícios</label>
            <Checkbox />
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
          <div className="row">
            <label>Usuarios</label>
            <Checkbox />
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>

        <PrimaryButton text="Cadastrar" onClick={handleSubmit} />
        <Modal
          width="338px"
          alertTitle="Cadastro de usuário concluído"
          show={showModal}
        >
          <SecondaryButton
            key={"modalButtons"}
            text="OK"
            onClick={handleCloseDialog}
            width="338px"
          />
        </Modal>
      </div>
    </section>
  );
}
