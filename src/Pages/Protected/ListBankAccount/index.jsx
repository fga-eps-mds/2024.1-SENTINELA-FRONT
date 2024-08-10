import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/auth";
import PrimaryButtom from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";
import "./index.css";
import { listBankAccount } from "../../../Services/bankAccountService";
import ListComponent from "../../../Components/ListComponent";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function ListBankAccount() {
  const [busca, setBusca] = useState("");
  const [dataMap, setDataMap] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = async () => {
    try {
      // Chama listBankAccount e aguarda a resposta
      const result = await listBankAccount(busca);
      if (result.message) {
        setOpenModal(true);
        return;
      }
      setDataMap(result);
    } catch (error) {
      alert("Ocorreu um erro ao realizar a pesquisa.");
    }
  };

  useEffect(() => {
    if (dataMap) {
      console.log(dataMap);
    }
  }, [dataMap]);

  const handleNavigateWithId = (id) => {
    navigate(`/finance/listBankAccount/${id}`);
  };

  return (
    user && (
      <section className="listContainer">
        <div className="listContainer list">
          <div className="header">
            <h1>Lista de Contas Bancárias</h1>
            <PrimaryButtom
              text="Cadastrar contas bancárias"
              onClick={() => navigate("/finance/bankAccount")}
            />
          </div>

          <div className="search">
            <FieldText
              label="Pesquisar Conta"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            <div>
              <SecondaryButton
                text="Pesquisar"
                onClick={() => handleSearch()}
              />
            </div>
          </div>
          {dataMap && dataMap.name ? (
            <div className="result">
              <div>
                <ListComponent
                  label={dataMap.name}
                  onClick={() => handleNavigateWithId(dataMap._id)}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <Snackbar
          open={openModal}
          autoHideDuration={6000}
          onClose={() => setOpenModal(false)}
        >
          <Alert onClose={() => setOpenModal(false)} severity="error">
            Conta não encontrada!
          </Alert>
        </Snackbar>
      </section>
    )
  );
}
