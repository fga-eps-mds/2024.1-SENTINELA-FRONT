import { useState } from "react";
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

  const [financeiro, setFinanceiro] = useState([false, false, false, false]);
  const [beneficios, setBeneficios] = useState([false, false, false, false]);
  const [usuarios, setUsuarios] = useState([false, false, false, false]);

  const navigate = useNavigate();

  const handleCheckboxChange = (setState, index) => {
    setState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Função para mapear permissões
  const mapPermissions = (moduleName, accessArray) => {
    const actions = ["create", "update", "read", "delete"];
    const grantedActions = actions.filter((_, index) => accessArray[index]);
    return {
      module: moduleName,
      access: grantedActions,
    };
  };

  const handleSubmit = async () => {
    try {
      const permissions = [
        mapPermissions("finance", financeiro),
        mapPermissions("benefits", beneficios),
        mapPermissions("users", usuarios),
      ];

      const newRole = {
        name: profileName,
        permissions: permissions,
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

  return (
    <section className="container">
      <div className="forms-container">
        <h1>Cadastro de Perfil</h1>
        <h3>Informações do Perfil</h3>

        <FieldText
          label="Nome do Perfil"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />

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
            <Checkbox
              name="create"
              checked={financeiro[0]}
              onChange={() => handleCheckboxChange(setFinanceiro, 0)}
            />
            <Checkbox
              name="editar"
              checked={financeiro[1]}
              onChange={() => handleCheckboxChange(setFinanceiro, 1)}
            />
            <Checkbox
              name="visualizar"
              checked={financeiro[2]}
              onChange={() => handleCheckboxChange(setFinanceiro, 2)}
            />
            <Checkbox
              name="deletar"
              checked={financeiro[3]}
              onChange={() => handleCheckboxChange(setFinanceiro, 3)}
            />
          </div>
          <div className="row">
            <label>Benefícios</label>
            <Checkbox
              name="create"
              checked={beneficios[0]}
              onChange={() => handleCheckboxChange(setBeneficios, 0)}
            />
            <Checkbox
              name="editar"
              checked={beneficios[1]}
              onChange={() => handleCheckboxChange(setBeneficios, 1)}
            />
            <Checkbox
              name="visualizar"
              checked={beneficios[2]}
              onChange={() => handleCheckboxChange(setBeneficios, 2)}
            />
            <Checkbox
              name="deletar"
              checked={beneficios[3]}
              onChange={() => handleCheckboxChange(setBeneficios, 3)}
            />
          </div>
          <div className="row">
            <label>Usuarios</label>
            <Checkbox
              name="create"
              checked={usuarios[0]}
              onChange={() => handleCheckboxChange(setUsuarios, 0)}
            />
            <Checkbox
              name="editar"
              checked={usuarios[1]}
              onChange={() => handleCheckboxChange(setUsuarios, 1)}
            />
            <Checkbox
              name="visualizar"
              checked={usuarios[2]}
              onChange={() => handleCheckboxChange(setUsuarios, 2)}
            />
            <Checkbox
              name="deletar"
              checked={usuarios[3]}
              onChange={() => handleCheckboxChange(setUsuarios, 3)}
            />
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
