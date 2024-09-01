import { useState, useEffect } from "react";
import "../RolesCreatePage/index.css";
import FieldText from "../../../../Components/FieldText";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import Modal from "../../../../Components/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getRoleById,
  updateRole,
  deleteRole,
} from "../../../../Services/RoleService/roleService";
import CheckboxRow from "../../../../Components/CheckboxRow";

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

          if (permissionsMap[moduleName]) {
            permission.access.forEach((access) => {
              const index = accessIndexMap[access];
              if (index !== undefined) {
                permissionsMap[moduleName][index] = true;
              }
            });
          } else {
            console.warn(
              `Módulo desconhecido encontrado: ${permission.module}`
            );
          }
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
            label="Usuários"
            state={usuarios}
            setState={setUsuarios}
          />
        </div>

        <div className="double-buttons-roles">
          <SecondaryButton
            text="DELETAR"
            onClick={() => setShowDeleteModal(true)}
          />
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
              onClick={() => setShowDeleteModal(false)}
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
              onClick={() => setShowSaveModal(false)}
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
