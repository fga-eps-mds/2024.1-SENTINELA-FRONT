import { useState } from "react";
import FieldText from "../../../Components/FieldText"; // Certifique-se de que o caminho está correto
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function ListOrgan() {
  const [nomeOrgao, setNomeOrgao] = useState("");
  const [lotacao, setLotacao] = useState("");
  const [sigla, setSigla] = useState("");
  const [errors, setErrors] = useState({});
  const [showAdd, setShowAdd] = useState(false);

  const handleShowAdd = () => {
    setShowAdd((prevState) => !prevState);
  };

  const handleBlur = (e, field) => {
    if (e.target.value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `O campo ${field} é obrigatório`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  return (
    <section className="section">
      <div className="forms-container-benefits">
        <h1>Cadastro de Órgãos</h1>

        <h3>Dados do Órgão</h3>

        <FieldText
          label="Nome do órgão*"
          value={nomeOrgao}
          onChange={(e) => setNomeOrgao(e.target.value)}
          onBlur={(e) => handleBlur(e, "nomeOrgao")}
          erro={errors["nomeOrgao"]}
        />

        <h3>Dados de Contato</h3>

        <FieldText
          label="Lotação*"
          value={lotacao}
          onChange={(e) => setLotacao(e.target.value)}
          onBlur={(e) => handleBlur(e, "lotacao")}
          erro={errors["lotacao"]}
        />

        <FieldText
          label="Sigla"
          value={sigla}
          onChange={(e) => setSigla(e.target.value)}
        />

        <div>
          <h3 id="addDependentBttn" onClick={handleShowAdd}>
            Adicionar mais lotações <AddCircleOutlineIcon />
          </h3>
        </div>

        {showAdd && (
          <div>
            <FieldText
              label="Lotação*"
              value={lotacao}
              onChange={(e) => setLotacao(e.target.value)}
              onBlur={(e) => handleBlur(e, "lotacao")}
              erro={errors["lotacao"]}
            />
            <FieldText
              label="Sigla"
              value={sigla}
              onChange={(e) => setSigla(e.target.value)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
