import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { ListItemText } from "@mui/material";
import DataSelect from "../../../../Components/DataSelect";
import FieldText from "../../../../Components/FieldText";

export default function UserHistoric() {
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  useEffect(() => {
    // Movimentação hard coded
    const hardCodedMovements = [
      {
        _id: "1",
        tipoDocumento: "Nota Fiscal",
        datadePagamento: "2023-08-01",
        valorBruto: 1500.0,
      },
      {
        _id: "2",
        tipoDocumento: "Recibo",
        datadePagamento: "2023-08-15",
        valorBruto: 2500.0,
      },
      {
        _id: "3",
        tipoDocumento: "Fatura",
        datadePagamento: "2023-07-25",
        valorBruto: 2000.0,
      },
    ];

    setMovements(hardCodedMovements);
  }, []);

  const handleItemClick = (movement) => {
    console.log("Item clicked:", movement);
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
      (!dataInicio || movementDate <= new Date(dataFinal));
    console.log(dataInicio, dataFinal, movementDate, isDateInRange);

    return isDocumentTypeMatch && isDateInRange;
  });

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
