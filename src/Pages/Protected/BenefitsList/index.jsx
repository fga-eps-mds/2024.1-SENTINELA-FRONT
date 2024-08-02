import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";
import { APIBenefits } from "../../../Services/BaseService";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText"; // Corrigido
import Divider from "@mui/material/Divider"; // Importado Divider

export default function ListSupplier() {
  const [search, setSearch] = useState("");
  const [benefits, setBenefits] = useState([]); // Estado para armazenar benefícios
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/beneficios/criar");
  };

  const handleItemClick = (benefits) => {
    navigate(`/beneficios/lista/${benefits.nome}`, {
      state: { benefitsId: benefits._id },
    });
  };

  const filteredBenefits = benefits.filter((benefit) =>
    benefit.nome.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const getBenefits = async () => {
      try {
        const response = await APIBenefits.get("benefits");
        console.log(response.data);
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
          <SecondaryButton text="Pesquisar" onClick={() => {}} /> {/* Adicione uma função para o onClick se necessário */}

          <List>
            {filteredBenefits.map((benefit, index) => (
              <div key={benefit._id}>
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
                    onClick={() => handleItemClick(benefit)}
                  >
                    <ListItemText primary={benefit.nome} />
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
