import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
//import "../../Users/userListPage/index.css";
import PrimaryButton from "../../../../Components/PrimaryButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import FieldText from "../../../../Components/FieldText";
import { APIUsers } from "../../../../Services/BaseService";
import { checkAction, usePermissions } from "../../../../Utils/permission";

export default function RolesListPage() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const permissions = usePermissions();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoleForm = async () => {
      try {
        const storagedUserString = localStorage.getItem("@App:user");
        const storagedUser = JSON.parse(storagedUserString);

        const response = await APIUsers.get("role", {
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

  const hasPermission = checkAction(permissions, "users", "create");

  const handleSubmit = () => {
    navigate("/perfis/criar");
  };

  const handleItemClick = (role) => {
    navigate(`/perfis/editar/${role.name}`, {
      state: { roleId: role._id },
    });
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container">
      <div className="forms-container">
        <div className="double-box">
          <h1>Lista de perfis</h1>
          {hasPermission && (
            <PrimaryButton text="Cadastrar perfil" onClick={handleSubmit} />
          )}
        </div>

        <FieldText
          label="Pesquisar perfil"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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
                    (e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  onClick={() => handleItemClick(role)}
                >
                  <ListItemText primary={role.name} />
                </ListItemButton>
              </ListItem>

              {index < filteredRoles.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </section>
  );
}
