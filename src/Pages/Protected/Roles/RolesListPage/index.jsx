import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import PrimaryButton from "../../../../Components/PrimaryButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import SecondaryButton from "../../../../Components/SecondaryButton";
import FieldText from "../../../../Components/FieldText";
import { APIUsers } from "../../../../Services/BaseService";

export default function RolesListPage() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const storagedUser = localStorage.getItem("@App:user");

  useEffect(() => {
    const fetchRoleForm = async () => {
      try {
        const response = await APIUsers.get(`/role`, {
          headers: {
            Authorization: `Bearer ${storagedUser.token}`,
          },
        });

        const data = response.data;
        if (Array.isArray(data)) {
          setRoles(data);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar perfis", error);
      }
    };

    fetchRoleForm();
  }, []);

  const handleSubmit = () => {
    navigate("/perfis/criar");
  };

  const handleItemClick = (role) => {
    navigate("/perfis/${role.nome}", {
      state: { roleId: role._id },
    });
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  <section className="container">
    <div className="forms-container">
      <div className="double-box">
        <h1>Lista de perfis</h1>
      </div>

      <div className="search-box">
        <FieldText
          label="Pesquisar perfil"
          value="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <PrimaryButton text="Cadastrar usuário" onClick={handleSubmit} />
      </div>

      <List>
        {filteredRoles.map((role, index) => (
          <div key={role._id}>
            <ListItem>
              <ListItemButton
                className="list-item"
                style={{
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={() => handleItemClick(role)}
              >
                <ListItemText primary={role.nome} />
              </ListItemButton>
            </ListItem>

            {index < filteredRoles.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  </section>
}
