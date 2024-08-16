import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../Components/PrimaryButton";
import FieldText from "../../../../Components/FieldText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import "./index.css";
import { getBenefitsForm } from "../../../../Services/benefitsService";

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
      const response = await getBenefitsForm();
      setBenefits(response);
    };

    getBenefits();
  }, []);

  return (
    <section className="container-list-benefits">
      <div className="forms-container-list-benefits">
        <div className="double-box-list-benefits">
          <h1> Lista de benefícios</h1>
          <PrimaryButton text="Cadastrar benefício" onClick={handleSubmit} />
        </div>
        <div className="search-box-benefits">
          <FieldText
            label="Pesquisar benefícios"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
