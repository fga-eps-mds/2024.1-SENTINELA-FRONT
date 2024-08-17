import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldText from "../../../../Components/FieldText";
import "../userHubPage/index.css";
import "./index.css";
import { getMemberShip } from "../../../../Services/memberShipService";

export default function MembershipListPage() {
  const [memberShips, setMemberships] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberShips = async () => {
      try {
        const response = await getMemberShip(true);
        if (Array.isArray(response)) {
          setMemberships(response);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchMemberShips();
  }, []);

  const handleItemClick = (membership) => {
    navigate(`/filiados/${membership.name}`, {
      state: { membershipId: membership._id },
    });
  };

  const filteredMemberships = memberShips.filter((membership) =>
    membership.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container-list">
      <div className="forms-container-list">
        <div className="double-box-list">
          <h1>Lista de Filiados</h1>
        </div>
        <FieldText
          label="Pesquisar Filiado"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <List>
          {filteredMemberships.map((membership, index) => (
            <div key={membership._id}>
              <ListItem>
                <ListItemButton
                  className="list-item"
                  onClick={() => handleItemClick(membership)}
                >
                  <ListItemText primary={membership.name} />
                </ListItemButton>
              </ListItem>
              {index < filteredMemberships.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </section>
  );
}
