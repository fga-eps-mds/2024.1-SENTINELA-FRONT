import "./index.css";
import { useAuth } from "../../../Context/auth";
import { getMemberShip } from "../../../Services/MemberShipService";
import { useEffect, useState } from "react";
import PrimaryButton from "../../../Components/PrimaryButton";

export default function MembershipRequest() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMemberShip();
        setMembers(data);
      } catch (error) {
        console.error("Erro ao buscar filiados:", error);
      }
    }
    fetchData();
  }, []);

  return (
    user && (
      <section className="membership-request">
        <h1>Página de Listagem de Solicitação de Filiação</h1>
        <PrimaryButton text="Mostrar Filiações" />
        <div className="members-list">
          {members.length > 0 ? (
            <ul>
              {members.map((member, index) => (
                <li key={index}>{member.nomeCompleto}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhum filiado encontrado.</p>
          )}
        </div>
      </section>
    )
  );
}
