import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/auth";
import PrimaryButtom from "../../../../Components/PrimaryButton";
import "./index.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FieldText from "../../../../Components/FieldText";
import { getAll } from "../../../../../src/Services/bankAccountService";
import { checkAction, usePermissions } from "../../../../Utils/permission";

export default function ListBankAccount() {
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bankAccounts, setBankAccounts] = useState([]);
  const permissions = usePermissions();
  const canCreate = checkAction(permissions, "finance", "create");

  useEffect(() => {
    const fetchBankAccounts = async () => {
      const data = await getAll();
      if (Array.isArray(data)) {
        setBankAccounts(data);
      }
    };

    fetchBankAccounts();
  }, []);

  const handleRegisterClick = () => {
    navigate("/finance/criar");
  };

  const handleItemClick = (bankAccount) => {
    navigate(`/finance/update/${bankAccount._id}`, {
      state: { bankAccountId: bankAccount._id },
    });
  };

  const filteredBankAccounts = bankAccounts.filter((bankAccount) =>
    bankAccount.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    user && (
      <section className="container-list-bankAccount">
        <div className="forms-container-list-bankAccount">
          <div className="double-box-list-bankAccount">
            <h1>Lista de Contas Bancárias</h1>
            {canCreate && (
              <PrimaryButtom
                text="Cadastrar contas bancárias"
                onClick={handleRegisterClick}
              />
            )}
          </div>
          <div className="search-box-bankAccount">
            <FieldText
              label="Pesquisar conta bancária"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <List>
              {filteredBankAccounts.map((bankAccount, index) => (
                <div key={bankAccount._id}>
                  <ListItem>
                    <ListItemButton
                      className="list-item-bankAccount"
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
                      onClick={() => handleItemClick(bankAccount)}
                    >
                      <ListItemText primary={bankAccount.name} />
                    </ListItemButton>
                  </ListItem>
                  {index < filteredBankAccounts.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </div>
        </div>
      </section>
    )
  );
}
