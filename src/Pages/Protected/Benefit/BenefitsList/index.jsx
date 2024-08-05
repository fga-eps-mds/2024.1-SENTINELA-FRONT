import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import FieldText from "../../../../Components/FieldText";
import { APIBenefits } from "../../../../Services/BaseService";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import "./index.css";

export default function ListSupplier() {
  const [search, setSearch] = useState("");
  const [benefits, setBenefits] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/beneficios/criar");
  };

  const handleItemClick = (benefits) => {
    navigate(`/beneficios/editar/${benefits.nome}`, {
      state: { benefitsId: benefits._id },
    });
  };

  const filteredBenefits = benefits.filter((benefits) =>
    benefits.nome.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const getBenefits = async () => {
      try {
        const response = await APIBenefits.get("/benefits");
        setBenefits(response.data); // Atualiza o estado com os dados da API
      } catch (error) {
        console.log(error);
      }
    };

    getBenefits();
  }, []);

  return (
    <section className="container">
      <div className="forms-container">
        <div className="double-box">
          <h1>Lista de convênios</h1>
          <PrimaryButton text="Cadastrar convênio" onClick={handleSubmit} />
        </div>

        <div className="search-box">
          <FieldText
            label="Pesquisar convênios"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SecondaryButton
            text="Pesquisar"
            onClick={() => filteredBenefits(search)}
          />
          <List>
            {filteredBenefits.map((benefits, index) => (
              <div key={benefits._id}>
                <ListItem>
                  <ListItemButton
                    className="list-item-benefits"
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
                    onClick={() => handleItemClick(benefits)}
                  >
                    <ListItemText primary={benefits.nome} />
                  </ListItemButton>
                </ListItem>

                {index < filteredBenefits.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </div>
      </div>
    </section>
  );
}
