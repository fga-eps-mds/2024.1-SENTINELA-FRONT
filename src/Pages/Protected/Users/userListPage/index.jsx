import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldText from "../../../../Components/FieldText";
import PrimaryButton from "../../../../Components/PrimaryButton";
import { APIUsers } from "../../../../Services/BaseService";
import "../userHubPage/index.css";
import "./index.css";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storagedUserString = localStorage.getItem("@App:user");
        const storagedUser = JSON.parse(storagedUserString);

        const response = await APIUsers.get("users", {
          headers: {
            Authorization: `Bearer ${storagedUser.token}`,
          },
        });

        const data = response.data;
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRegisterClick = () => {
    navigate("/usuarios/criar");
  };

  const handleItemClick = (user) => {
    navigate(`/usuarios/editar/${user.name}`, { state: { userId: user._id } });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container-list">
      <div className="forms-container-list">
        <div className="double-box-list">
          <h1>Lista de Usuários</h1>
          <PrimaryButton
            text="Cadastrar Usuário"
            onClick={handleRegisterClick}
          />
        </div>
        <FieldText
          label="Pesquisar Usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <List>
          {filteredUsers.map((user, index) => (
            <div key={user._id}>
              <ListItem>
                <ListItemButton
                  className="list-item"
                  onClick={() => handleItemClick(user)}
                >
                  <ListItemText primary={user.name} />
                </ListItemButton>
              </ListItem>
              {index < filteredUsers.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </section>
  );
}
