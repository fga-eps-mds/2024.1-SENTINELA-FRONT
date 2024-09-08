import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../Components/PrimaryButton";
import FieldText from "../../../../Components/FieldText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { listOrgans } from "../../../../Services/organService";
import "./index.css";
import { checkAction, usePermissions } from "../../../../Utils/permission";

export default function OrganList() {
  const permissions = usePermissions();
  const [search, setSearch] = useState("");
  const [organs, setOrgans] = useState([]);
  const navigate = useNavigate();

  const canCreate = checkAction(permissions, "users", "create");
  useEffect(() => {
    const getOrgansInfo = async () => {
      const response = await listOrgans();
      setOrgans(Array.isArray(response) ? response : []);
    };

    getOrgansInfo();
  }, []);

  const handleSubmit = () => {
    navigate("/organ/create");
  };

  const handleItemClick = (organs) => {
    navigate(`/organ/update/${organs.orgao}`, {
      state: { organsId: organs._id },
    });
  };

  const filteredOrgans = organs?.filter((organs) =>
    organs.orgao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container-list-organs">
      <div className="forms-container-list-organs">
        <div className="double-box-list-organs">
          <h1 className="title-center"> Lista de órgãos</h1>
          {canCreate && (
            <PrimaryButton text="Cadastrar órgão" onClick={handleSubmit} />
          )}
        </div>
        <div className="search-box-organs">
          <FieldText
            label="Pesquisar órgão"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <List>
            {filteredOrgans?.map((organs, index) => (
              <div key={organs._id}>
                <ListItem>
                  <ListItemButton
                    className="list-item-organs"
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
                    onClick={() => handleItemClick(organs)}
                  >
                    <ListItemText primary={organs.orgao} />
                  </ListItemButton>
                </ListItem>

                {index < filteredOrgans.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </div>
      </div>
    </section>
  );
}
