import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import PrimaryButton from "../../../../Components/PrimaryButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import DataSelect from "../../../../Components/DataSelect";
import FieldText from "../../../../Components/FieldText";
import { APIBank } from "../../../../Services/BaseService";

export default function FinancialList() {
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  const storagedUser = JSON.parse(localStorage.getItem("@App:user"));

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        console.log("Fetching movements...");
        const response = await APIBank.get(`/financialMovements`, {
          headers: {
            Authorization: `Bearer ${storagedUser.token}`,
          },
        });

        const data = response.data;
        console.log("Movements fetched:", data);
        if (Array.isArray(data)) {
          setMovements(data);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar movimentos financeiros:", error);
      }
    };

    fetchMovements();
  }, []);

  const handleSubmit = () => {
    console.log("Navigating to create page");
    navigate("/movimentacoes/criar");
  };

  const handleItemClick = (movement) => {
    console.log("Item clicked:", movement);
    navigate(`/movimentacoes/visualizar/${movement._id}`, {
      state: { movementId: movement._id },
    });
  };

  const filteredMovements = movements.filter((movement) => {
    const isDescriptionMatch = movement.descricao
      .toLowerCase()
      .includes(search.toLowerCase());

    const movementDate = new Date(movement.datadePagamento);
    const isDateInRange =
      (!dataInicio || movementDate >= new Date(dataInicio)) &&
      (!dataInicio || movementDate <= new Date(dataFinal));
    console.log(dataInicio, dataFinal, movementDate, isDateInRange);

    return isDescriptionMatch && isDateInRange;
  });

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
        </div>

        <div className="date-box">
          <DataSelect
            label="Data Inicial"
            value={dataInicio}
            onChange={(newValue) => setDataInicio(newValue)}
          />
          <DataSelect
            label="Data Final"
            value={dataFinal}
            onChange={(newValue) => setDataFinal(newValue)}
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
                  <ListItemText
                    primary={movement.descricao}
                    secondary={`Data de pagamento: ${new Date(
                      movement.datadePagamento
                    ).toLocaleDateString()}`}
                  />
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
