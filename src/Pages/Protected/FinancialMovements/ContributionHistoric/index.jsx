import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { ListItemText } from "@mui/material";
import DataSelect from "../../../../Components/DataSelect";
import FieldText from "../../../../Components/FieldText";
import { getFinancialMovements } from "../../../../Services/FinancialMovementsService";
import "./index.css";

export default function UserHistoric() {
  const { state } = useLocation();
  const { nomeCompleto } = state || {};
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const allMovements = await getFinancialMovements(); // Fetch movements from API
        const filteredMovements = allMovements.filter(
          (movement) => movement.nomeOrigem === nomeCompleto
        );
        setMovements(filteredMovements);
      } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
      }
    };

    if (nomeCompleto) {
      fetchMovements();
    }
  }, [nomeCompleto]);

  const handleItemClick = (movement) => {
    navigate(`/movimentacoes/visualizar/${movement._id}`, {
      state: { movementId: movement._id },
    });
  };

  const filteredMovements = movements.filter((movement) => {
    const isDocumentTypeMatch = movement.tipoDocumento
      .toLowerCase()
      .includes(search.toLowerCase());

    const movementDate = new Date(movement.datadePagamento);
    const isDateInRange =
      (!dataInicio || movementDate >= new Date(dataInicio)) &&
      (!dataFinal || movementDate <= new Date(dataFinal));

    return isDocumentTypeMatch && isDateInRange;
  });

  const totalGasto = filteredMovements.reduce((total, movement) => {
    return total + movement.valorBruto;
  }, 0);

  return (
    <section className="container">
      <div className="forms-container">
        <div className="double-box">
          <h1>Histórico de Contribuições</h1>
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

        <div className="area-gastos">
          <h3>
            Valor gasto no período selecionado: R$ {totalGasto.toFixed(2)}
          </h3>
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
                    primary={movement.tipoDocumento}
                    secondary={`Data de pagamento: ${new Date(
                      movement.datadePagamento
                    ).toLocaleDateString()}`}
                  />
                  <ListItemText
                    secondary={`R$ ${movement.valorBruto.toFixed(2)}`}
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
