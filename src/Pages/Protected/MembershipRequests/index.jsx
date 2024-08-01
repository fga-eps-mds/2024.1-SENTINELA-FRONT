import "./index.css";
import { useAuth } from "../../../Context/auth";
import { getMemberShip } from "../../../Services/MemberShipService";
import { useEffect, useState } from "react";
import PrimaryButton from "../../../Components/PrimaryButton";
import LabeledTextField from "../../../Components/LabeledTextField";
import FieldText from "../../../Components/FieldText";
import SecondaryButton from "../../../Components/SecondaryButton";
import CheckList from "../../../Components/Checklist";

export default function MembershipRequest() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [dataMap, setDataMap] = useState(null);
  const [search, setSearch] = useState("");
  const [isResultReadOnly, setIsResultReadOnly] = useState(false);

  const handleSearch = async () => {
    try {
      const result = await getMemberShip();
      if (result.message) {
        console.log(result.message);
        return;
      }
      const filteredData = result.filter(member =>
        member.nomeCompleto.toLowerCase().includes(search.toLowerCase())
      );
      setDataMap(filteredData.length > 0 ? filteredData[0] : null); // Display the first matching result
      setIsResultReadOnly(true); // Make the result field read-only after search
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dataMap) {
      console.log(dataMap);
    }
  }, [dataMap]);

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
          />
          <SecondaryButton text="Pesquisar" onClick={handleSearch} />
        </div>
        <div className="read-only">
          {dataMap ? (
            <LabeledTextField
              label="Nome do Membro"
              value={dataMap.nomeCompleto || ""}
              readOnly={isResultReadOnly} // Make this field read-only if search has been performed
             
            />
          
          
            
          ) : (
            <p>Nenhum membro encontrado.</p>
          )}
        </div>
      </section>
    )
  );
}
