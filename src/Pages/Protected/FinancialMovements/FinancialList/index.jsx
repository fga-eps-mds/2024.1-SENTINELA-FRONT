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
import DataSelect from "../../../../Components/DataSelect";
import FieldText from "../../../../Components/FieldText";
import "dayjs/locale/pt-br";
import { APIBank } from "../../../../Services/BaseService";
// import dayjs from "dayjs";

export default function FinancialList() {
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  const storagedUser = localStorage.getItem("@App:user");

  useEffect(() => {
    const fetchMovementsForm = async () => {
      try {
        const response = await APIBank.get(`/SupplierForm`, {
          headers: {
            Authorization: `Bearer ${storagedUser.token}`,
          },
        });

        const data = response.data;
        if (Array.isArray(data)) {
          setMovements(data);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };

    fetchMovementsForm();
  }, []);

  const handleSubmit = () => {
    navigate("/movimentacao/criar");
  };

  const handleItemClick = (movement) => {
    navigate("/movimentacao/${movement.name}", {
      state: { movementId: movement._id },
    });
  };

  const filteredMovements = movements.filter((movement) =>
    movement.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container">
      <div className="forms-container">
        <div className="double-box">
          <h1>Lista de movimentações</h1>
          <PrimaryButton text="Cadastrar movimentação" onClick={handleSubmit} />
        </div>

        <div className="search-box">
          <FieldText
            label="Pesquisar movimentação"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SecondaryButton
            text="Pesquisar"
            onClick={() => filteredMovements(search)}
          />
        </div>

        <div className="date-box">
          <DataSelect
            label="Data Inicial"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <DataSelect
            label="Data Final"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>

        <List>
          {filteredMovements.map((movement, index) => (
            <div key={movement._id}>
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
                  onClick={() => handleItemClick(movement)}
                >
                  <ListItemText primary={movement.name} />
                </ListItemButton>
              </ListItem>

              {index < filteredMovements.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </section>
  );
}
