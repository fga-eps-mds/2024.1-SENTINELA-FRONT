import { useState } from "react";
import PropTypes from "prop-types"; // Importando o PropTypes
import "./index.css";
import FieldText from "../../../../Components/FieldText";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import Modal from "../../../../Components/Modal";
import { Checkbox } from "@mui/material";
import { createRole } from "../../../../Services/RoleService/roleService";
import { useNavigate } from "react-router-dom";

// Componente reutilizável para linhas de checkboxes
const CheckboxRow = ({ label, state, setState }) => (
  <div className="row">
    <label>{label}</label>
    {state.map((checked, index) => (
      <Checkbox
        key={index}
        checked={checked}
        onChange={() =>
          setState((prev) => prev.map((v, i) => (i === index ? !v : v)))
        }
      />
    ))}
  </div>
);

// Definindo as prop-types para o componente CheckboxRow
CheckboxRow.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setState: PropTypes.func.isRequired,
};

export default function RolesCreatePage() {
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [financeiro, setFinanceiro] = useState([false, false, false, false]);
  const [beneficios, setBeneficios] = useState([false, false, false, false]);
  const [usuarios, setUsuarios] = useState([false, false, false, false]);

  const navigate = useNavigate();

  // Função para mapear permissões
  const mapPermissions = (moduleName, accessArray) => {
    const actions = ["create", "read", "update", "delete"];
    return {
      module: moduleName,
      access: actions.filter((_, index) => accessArray[index]),
    };
  };

  const handleSubmit = async () => {
    try {
      const permissions = [
        mapPermissions("finance", financeiro),
        mapPermissions("benefits", beneficios),
        mapPermissions("users", usuarios),
      ];

      const newRole = { name: profileName, permissions };

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
        {!profileName && (
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
          <CheckboxRow
            label="Financeiro"
            state={financeiro}
            setState={setFinanceiro}
          />
          <CheckboxRow
            label="Benefícios"
            state={beneficios}
            setState={setBeneficios}
          />
          <CheckboxRow
            label="Usuarios"
            state={usuarios}
            setState={setUsuarios}
          />
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
