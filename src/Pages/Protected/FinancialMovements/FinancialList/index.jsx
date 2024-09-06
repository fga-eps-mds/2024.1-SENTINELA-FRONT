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
import { checkAction, usePermissions } from "../../../../Utils/permission";

export default function FinancialList() {
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const permissions = usePermissions();
  const canCreate = checkAction(permissions, "finance", "create");

  const storagedUser = JSON.parse(localStorage.getItem("@App:user"));

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await APIBank.get(`/financialMovements`, {
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
        console.error("Erro ao buscar movimentos financeiros:", error);
      }
    };

    fetchMovements();
  }, []);

  const handleSubmit = () => {
    navigate("/movimentacoes/criar");
  };

  const handleItemClick = (movement) => {
    navigate(`/movimentacoes/visualizar/${movement._id}`, {
      state: { movementId: movement._id },
    });
  };

  const filteredMovements = movements.filter((movement) => {
    const isDocumentTypeMatch = movement.tipoDocumento
      .toLowerCase()
      .includes(search.toLowerCase());

    const movementDate = new Date(movement.datadeVencimento);
    const startDate = dataInicio ? new Date(dataInicio) : null;
    const finalDate = dataFinal ? new Date(dataFinal) : null;

    const isDateInRange =
      (!startDate || movementDate >= startDate) &&
      (!finalDate || movementDate <= finalDate);

    return isDocumentTypeMatch && isDateInRange;
  });

  return (
    <section className="container-financialist">
      <div className="forms-container-financialList">
        <div className="double-box-financialList">
          <h1>Lista de movimentações</h1>
          {canCreate && (
            <PrimaryButton
              text="Cadastrar movimentação"
              onClick={handleSubmit}
            />
          )}
        </div>

        <div className="search-box-financialList">
          <FieldText
            label="Pesquisar movimentação"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="date-box-financialList">
          <DataSelect
            label="Data inicial"
            value={dataInicio}
            onChange={(newValue) => setDataInicio(newValue)}
          />
          <DataSelect
            label="Data final"
            value={dataFinal}
            onChange={(newValue) => setDataFinal(newValue)}
          />
        </div>

        <List>
          {filteredMovements.map((movement, index) => (
            <div key={movement._id}>
              <ListItem>
                <ListItemButton
                  className="list-item-financialList"
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
                    secondary={`Data de vencimento: ${new Date(
                      movement.datadeVencimento
                    ).toLocaleDateString()}`}
                  />
                  <ListItemText secondary={movement.descricao} />
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
