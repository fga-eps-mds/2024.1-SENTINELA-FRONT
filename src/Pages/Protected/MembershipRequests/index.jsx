import "./index.css";
import { useAuth } from "../../../Context/auth";
import {
  getMemberShip,
  updateMemberStatus,
  deleteMember,
} from "../../../Services/memberShipService";
import { useEffect, useState } from "react";
import FieldText from "../../../Components/FieldText";
import SecondaryButton from "../../../Components/SecondaryButton";
import CheckList from "../../../Components/Checklist";
import PrimaryButton from "../../../Components/PrimaryButton";
import Modal from "../../../Components/Modal";
import { useNavigate } from "react-router-dom";

export default function MembershipRequest() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [openSuccessApproval, setSuccessApproval] = useState(false);
  const [openSuccessDelete, setSuccessDelete] = useState(false);
  const [openTryingDelete, setTryingDelete] = useState(false);
  const navigate = useNavigate();

  // Fetch all members on component mount
  useEffect(() => {
    async function fetchData() {
      const result = await getMemberShip(false);
      if (result.message) {
        return;
      }
      setMembers(result);
      setFilteredMembers(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filter = members.filter((member) =>
      member.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMembers(filter);
  }, [search]);

  const handleConfirm = async () => {
    try {
      checkedItems.forEach(async (checkedItem) => {
        await updateMemberStatus(checkedItem);
      });

      const result = await getMemberShip(false);
      setMembers(result);
      setFilteredMembers(result);
      setCheckedItems([]);
      setSuccessApproval(true);
    } catch (error) {
      console.error("Error updating member status:", error);
    }
  };

  const handleReject = async () => {
    try {
      // Filtra os membros que estão nos checkedItems
      const membersToDelete = filteredMembers.filter((member) =>
        checkedItems.includes(member._id)
      );

      // Itera sobre os membros filtrados e realiza as exclusões
      for (const memberDelete of membersToDelete) {
        console.log("Deletando membro:", memberDelete);

        await deleteMember(memberDelete._id); // Exclui o membro
      }

      // Atualiza o estado para indicar que a exclusão foi bem-sucedida
      setTryingDelete(false);
      setSuccessDelete(true);
    } catch (error) {
      // Captura e exibe qualquer erro durante a exclusão
      console.error("Erro ao deletar membros:", error);
    }
  };

  return (
    user && (
      <section className="membership-request">
        <h1>Solicitações de Filiação</h1>
        <div className="user-info">
          <FieldText
            label="Pesquisar usuário"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="member-list">
          {filteredMembers.length > 0 ? (
            <>
              <CheckList
                items={filteredMembers}
                value={checkedItems}
                onChange={(value) => {
                  setCheckedItems(value);
                }}
              />

              <div className="button-group">
                <div className="individual">
                  <PrimaryButton
                    text="Rejeitar"
                    onClick={() => setTryingDelete(true)}
                  />
                </div>

                <div className="individual">
                  <SecondaryButton text="Aprovar" onClick={handleConfirm} />
                </div>
              </div>
            </>
          ) : (
            <p>Nenhum membro encontrado.</p>
          )}
        </div>

        <Modal
          show={openSuccessApproval}
          alertTitle="Solicitações aprovadas"
          alert="Os filiados devem receber em breve um e-mail para gerar a senha de acesso"
          width="100%"
        >
          <PrimaryButton text="ok" onClick={() => navigate("/usuarios/hub")} />
        </Modal>

        <Modal
          show={openTryingDelete}
          alertTitle="Você rejeitou as solicitações selecionadas"
          alert="Deseja confirmar a decisão para que eles sejam excluídas?"
          width="100%"
        >
          <PrimaryButton text="Excluir solicitações" onClick={handleReject} />
          <SecondaryButton
            text="Cancelar e manter solicitações"
            onClick={() => setTryingDelete(false)}
          />
        </Modal>

        <Modal
          show={openSuccessDelete}
          alertTitle="Solicitações excluídas"
          alert="Os filiados foram excluídos com sucesso"
          width="100%"
        >
          <PrimaryButton text="Fechar" onClick={() => navigate("/home")} />
        </Modal>
      </section>
    )
  );
}
