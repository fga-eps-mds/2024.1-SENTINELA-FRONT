import { useState, useEffect } from "react";
import "../RolesCreatePage/index.css";
import FieldText from "../../../../Components/FieldText";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import Modal from "../../../../Components/Modal";
import { Checkbox } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getRoleById,
  updateRole,
  deleteRole,
} from "../../../../Services/RoleService/roleService";

export default function RolesUpdatePage() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessDelModal, setShowSuccessDelModal] = useState(false);
  const [profileName, setProfileName] = useState("");

  const [financeiro, setFinanceiro] = useState([false, false, false, false]);
  const [beneficios, setBeneficios] = useState([false, false, false, false]);
  const [usuarios, setUsuarios] = useState([false, false, false, false]);

  const navigate = useNavigate();
  const location = useLocation();
  const { roleId } = location.state;

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const roleData = await getRoleById(roleId);

        setProfileName(roleData.name);

        const permissionsMap = {
          finance: [false, false, false, false],
          benefits: [false, false, false, false],
          users: [false, false, false, false],
        };

        const moduleNameMap = {
          financeiro: "finance",
          beneficios: "benefits",
          usuarios: "users",
        };

        // Definindo o mapa de índices de acesso
        const accessIndexMap = {
          create: 0,
          read: 1,
          update: 2,
          delete: 3,
        };

        roleData.permissions.forEach((permission) => {
          const moduleName =
            moduleNameMap[permission.module.toLowerCase()] ||
            permission.module.toLowerCase();

          permission.access.forEach((access) => {
            const index = accessIndexMap[access];
            if (index !== undefined) {
              permissionsMap[moduleName][index] = true;
            }
          });
        });

        setFinanceiro(permissionsMap.finance);
        setBeneficios(permissionsMap.benefits);
        setUsuarios(permissionsMap.users);
      } catch (error) {
        console.error("Erro ao buscar o perfil:", error);
      }
    };

    fetchRole();
  }, [roleId]);

  const handleCheckboxChange = (setState, index) => {
    setState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

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

      const updatedRole = {
        name: profileName,
        permissions: permissions,
      };

      await updateRole(roleId, updatedRole);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  };

  const handleDeleteRole = async () => {
    try {
      await deleteRole(roleId);
      setShowSuccessDelModal(true);
    } catch (error) {
      console.error("Erro ao deletar o perfil:", error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setShowSuccessDelModal(false);
    navigate("/perfis");
  };

  return (
    <section className="container">
      <div className="forms-container">
        <h1>Atualização de Perfil</h1>
        <h3>Informações do Perfil</h3>

        <FieldText
          label="Nome do Perfil"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
        {!(profileName.length > 0) && (
          <label className = "invalid">Nome é um campo obrigatório!</label>
        )
        }
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
            <label>Usuários</label>
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

        <div className="double-buttons-roles">
          <SecondaryButton text="DELETAR" onClick={()=>setShowDeleteModal(true)} />
          <Modal
            width="338px"
            alert="Deseja excluir este perfil? Usuários que os possuem perderão suas permissões!"
            show={showDeleteModal}
          >
            <SecondaryButton
              key="confirmar"
              text="Confirmar"
              onClick={handleDeleteRole}
              width="338px"
            />
            <SecondaryButton
              key="cancelar"
              text="Cancelar"
              onClick={()=> setShowDeleteModal(false)}
              width="338px"
            />
          </Modal>

          <PrimaryButton text="SALVAR" onClick={() => setShowSaveModal(true)} />
          <Modal
            width="338px"
            alert="DESEJA CONTINUAR COM AS ALTERAÇÕES FEITAS NO PERFIL?"
            show={showSaveModal}
          >
            <SecondaryButton
              key="confirmar2"
              text="Confirmar"
              onClick={handleSubmit}
              width="338px"
            />
            <SecondaryButton
              key="cancelar2"
              text="Cancelar"
              onClick={()=> setShowSaveModal(false)}
              width="338px"
            />
          </Modal>
          <Modal
            width="338px"
            alert="PERFIL ALTERADO COM SUCESSO"
            show={showSuccessModal}
          >
            <SecondaryButton
              key="ok"
              text="Ok"
              onClick={handleCloseSuccessModal}
              width="338px"
            />
          </Modal>
          <Modal
            width="338px"
            alert="PERFIL DELETADO COM SUCESSO"
            show={showSuccessDelModal}
          >
            <SecondaryButton
              key="ok"
              text="Ok"
              onClick={handleCloseSuccessModal}
              width="338px"
            />
          </Modal>
        </div>
      </div>
    </section>
  );
}
