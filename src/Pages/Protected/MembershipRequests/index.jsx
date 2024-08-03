import "./index.css";
import { useAuth } from "../../../Context/auth";
import {
  getMemberShip,
  updateMemberStatus,
  deleteMember,
} from "../../../Services/MemberShipService";
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
  const [isResultReadOnly, setIsResultReadOnly] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openSucessAproval, setSucesssAproval] = useState(false);
  const [openSucessDelete, setSucessDelete] = useState(false);
  const [openTryingDelete, setTryingDelete] = useState(false);
  const navigate = useNavigate();

  // Fetch all members on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getMemberShip();
        if (result.message) {
          console.log(result.message);
          return;
        }
        setMembers(result);
        setFilteredMembers(result); // Show all members initially
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });

  const handleSearch = () => {
    // Filter members based on the search query
    const filteredData = members.filter((member) =>
      member.nomeCompleto.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMembers(filteredData);
    setIsResultReadOnly(true); // Make this field read-only after search
  };

  const handleCheckboxChange = (newChecked) => {
    // Update state with the new checked items
    setCheckedItems(newChecked);
  };

  const handleConfirm = async () => {
    try {
      // Filter out members whose names are checked
      const membersToUpdate = filteredMembers.filter((member) =>
        checkedItems.includes(member.nomeCompleto)
      );

      // Update the status of the selected members
      for (const member of membersToUpdate) {
        await updateMemberStatus(member._id);
      }

      // Optionally, re-fetch members or update state to reflect changes
      const result = await getMemberShip();
      if (result.message) {
        console.log(result.message);
        return;
      }
      setMembers(result);
      setFilteredMembers(result);
      setCheckedItems([]);
      setSucesssAproval(true);
    } catch (error) {
      console.error("Error updating member status:", error);
    }
  };
  const handleReject = async () => {
    try {
      // Filter out members whose names are checked
      const membersToDelete = filteredMembers.filter((member) =>
        checkedItems.includes(member.nomeCompleto)
      );
      for (const memberDelete of membersToDelete) {
        await deleteMember(memberDelete._id);
      }

      setTryingDelete(false);
      setSucessDelete(true);
    } catch (error) {
      console.error("Error deleting member status:", error);
    }
  };

  // Filter members with status = true for the checklist
  const membersForCheckList = filteredMembers.filter((member) => member.status);

  return (
    user && (
      <section className="membership-request">
        <h1>Página de Listagem de Solicitação de Filiação</h1>
        <div className="user-info">
          <FieldText
            label="Pesquisar usuário"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            readOnly={isResultReadOnly} // Make field read-only after search
          />
          <SecondaryButton text="Pesquisar" onClick={handleSearch} />
        </div>
        <div className="member-list">
          {membersForCheckList.length > 0 ? (
            <>
              <CheckList
                items={membersForCheckList.map((member) => member.nomeCompleto)}
                value={checkedItems}
                onChange={handleCheckboxChange}
              />
              <div className="button-group">
                <PrimaryButton
                  text="Rejeitar"
                  onClick={() => setTryingDelete(true)}
                />
                <SecondaryButton text="Aprovar" onClick={handleConfirm} />
              </div>
            </>
          ) : (
            <p>Nenhum membro encontrado.</p>
          )}
        </div>

        <Modal
          show={openSucessAproval}
          alertTitle="Solicitações aprovadas"
          alert="Os filiados devem receber em breve um e-mail para gerar a senha de acesso"
          width="100%"
        >
          <PrimaryButton
            text="Fechar"
            onClick={() => setSucesssAproval(false)}
          />
        </Modal>

        <Modal
          show={openTryingDelete}
          alertTitle="Você rejeitou as solicitações selecionadas"
          alert="Deseja confirmar a decisão para que eles sejam excluídas?"
          width="100%"
        >
          <PrimaryButton text="Excluir solicitações" onClick={handleReject} />

          <SecondaryButton
            text="Cancelr e manter solicitações"
            onClick={() => setTryingDelete(false)}
          />
        </Modal>

        <Modal
          show={openSucessDelete}
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
