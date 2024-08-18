import { useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import FieldText from "../../../../Components/FieldText";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import Modal from "../../../../Components/Modal";
import { Checkbox } from "@mui/material";
import { createRole } from "../../../../Services/RoleService/roleService";
import { useNavigate } from "react-router-dom";

export default function RolesCreatePage() {
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [permissions, setPermissions] = useState({
    financeiro: [false, false, false, false],
    beneficios: [false, false, false, false],
    usuarios: [false, false, false, false],
  });

  const navigate = useNavigate();

  const handleCheckboxChange = (module, index) => {
    setPermissions((prevState) => ({
      ...prevState,
      [module]: prevState[module].map((perm, idx) =>
        idx === index ? !perm : perm
      ),
    }));
  };

  const mapPermissions = (moduleName, accessArray) => {
    const actions = ["create", "read", "update", "delete"];
    const grantedActions = actions.filter((_, index) => accessArray[index]);
    return {
      module: moduleName,
      access: grantedActions,
    };
  };

  const handleSubmit = async () => {
    try {
      const newRole = {
        name: profileName,
        permissions: Object.entries(permissions).map(([module, access]) =>
          mapPermissions(module, access)
        ),
      };
      console.log("Tentando criar role com os dados:", newRole);
      const response = await createRole(newRole);
      console.log("Resposta da API:", response);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao criar o perfil:", error);
    }
  };

  const handleCloseDialog = () => {
    setShowModal(false);
    navigate("/perfis");
  };

  const PermissionRow = ({ moduleName, label }) => (
    <div className="row">
      <label>{label}</label>
      {permissions[moduleName].map((checked, index) => (
        <Checkbox
          key={index}
          checked={checked}
          onChange={() => handleCheckboxChange(moduleName, index)}
        />
      ))}
    </div>
  );

  // Add prop types validation
  PermissionRow.propTypes = {
    moduleName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  return (
    <section className="container">
      <div className="forms-container">
        <h1>Cadastro de Perfil</h1>
        <h3>Informações do Perfil</h3>
        <FieldText
          label="Nome do Perfil*"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
        {!(profileName.length > 0) && (
          <label className="invalid">Nome é um campo obrigatório!</label>
        )}
        <div className="select-profile">
          <div className="row-labels">
            <label></label>
            <label>Criar</label>
            <label>Visualizar</label>
            <label>Editar</label>
            <label>Deletar</label>
          </div>
          <PermissionRow moduleName="financeiro" label="Financeiro" />
          <PermissionRow moduleName="beneficios" label="Benefícios" />
          <PermissionRow moduleName="usuarios" label="Usuários" />
        </div>
        <PrimaryButton text="Cadastrar" onClick={handleSubmit} />
        <Modal
          width="338px"
          alert="Cadastro de usuário concluído"
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
