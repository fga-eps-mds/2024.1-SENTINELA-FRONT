import { useState } from "react";
import "../RolesCreatePage/index";
import FieldText from "../../../../Components/FieldText";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import Modal from "../../../../Components/Modal";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RolesUpdatePage() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setShowSaveModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleSaveRole = () => {
    try {
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteRole = () => {
    try {
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseSaveRole = () => {
    setShowSaveModal(false);
  };
  const handleCloseDeleteRole = () => {
    setShowDeleteModal(false);
  };
  const handleOK = () => {
    navigate("/perfis");
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
        <div className="double-buttons-roles">
          <SecondaryButton text="DELETAR" onClick={handleDelete} />
          <Modal
            width="338px"
            alertTitle="DESEJA EXCLUIR ESSE PERFIL? USUÁRIOS QUE OS POSSUEM PERDERÃO SUAS PERMISSÕES!"
            show={showDeleteModal}
          >
            <SecondaryButton
              key={"modalButtons"}
              text="Confirmar"
              onClick={handleDeleteRole}
              width="338px"
            />
            <SecondaryButton
              key={"modalButtons"}
              text="Cancelar"
              onClick={handleCloseDeleteRole}
              width="338px"
            />
          </Modal>

          <PrimaryButton text="SALVAR" onClick={handleSubmit} />
          <Modal
            width="338px"
            alertTitle="DESEJA CONTINUAR COM AS ALTERAÇÕES FEITAS NO PERFIL?"
            show={showSaveModal}
          >
            <SecondaryButton
              key={"modalButtons"}
              text="Confirmar"
              onClick={handleSaveRole}
              width="338px"
            />
            <SecondaryButton
              key={"modalButtons"}
              text="Cancelar"
              onClick={handleCloseSaveRole}
              width="338px"
            />
          </Modal>
          <Modal
            width="338px"
            alertTitle="PERFIL ALTERADO COM SUCESSO"
            show={showModal}
          >
            <SecondaryButton
              key={"modalButtons"}
              text="Ok"
              onClick={handleOK}
              width="338px"
            />
          </Modal>
        </div>
      </div>
    </section>
  );
}
