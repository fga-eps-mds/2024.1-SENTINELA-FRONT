import { useState } from "react";
import FieldText from "../../../../Components/FieldText"; // Certifique-se de que o caminho está correto
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PrimaryButton from "../../../../Components/PrimaryButton"; // Certifique-se de que o caminho está correto
import { createOrgan } from "../../../../Services/organService";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Modal from "../../../../Components/Modal";
import SecondaryButton from "../../../../Components/SecondaryButton";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function OrganCreate() {
  const [nomeOrgao, setNomeOrgao] = useState("");
  const [errors, setErrors] = useState({});
  const [lotacao, setLotacao] = useState([]);
  const [sigla, setSigla] = useState("");
  const [lotacoes, setLotacoes] = useState([]);
  const [currentLotacoes, setCurrentLotacoes] = useState([
    { nomeLotacao: "", sigla: "" },
  ]);
  const [confirmedLotacoes, setConfirmedLotacoes] = useState([false]);
  const [add, setAdd] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nomeOrgao || !lotacao || !sigla) {
      setOpenError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (nomeOrgao.trim() && lotacao.trim() && sigla.trim()) {
      // Crie o primeiro item do array com os campos iniciais de lotação e sigla
      const initialLotacao = {
        nomeLotacao: lotacao,
        sigla: sigla,
      };

      // Combine o primeiro item com as lotações confirmadas posteriormente
      const combinedLotacoes = [initialLotacao, ...lotacoes];

      const formData = { nomeOrgao, lotacoes: combinedLotacoes };
      console.log(formData);
      try {
        const response = await createOrgan(nomeOrgao, combinedLotacoes);
        if (response) {
          setShowModal(true);
        }
      } catch (error) {
        console.error("Erro ao cadstrar órgao: ", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setShowModal(false);
    navigate("/organ/list");
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

  const handleCurrentLotacaoChange = (index, field, value) => {
    const newLotacoes = [...currentLotacoes];
    newLotacoes[index] = { ...newLotacoes[index], [field]: value };
    setCurrentLotacoes(newLotacoes);
  };

  const handleAddLotacao = () => {
    if (
      currentLotacoes.every(
        (lotacao) => lotacao.nomeLotacao.trim() && lotacao.sigla.trim()
      )
    ) {
      setLotacoes([...lotacoes, ...currentLotacoes]);
      setConfirmedLotacoes([
        ...confirmedLotacoes,
        ...currentLotacoes.map(() => false),
      ]); // Reset confirmation status
      setCurrentLotacoes([{ nomeLotacao: "", sigla: "" }]);
    } else {
      // Adicione a lógica de erro se necessário
    }
  };

  const handleRemoveLotacao = (index) => {
    if (lotacoes.length > 0) {
      setLotacoes(lotacoes.filter((_, i) => i !== index));
      setConfirmedLotacoes(confirmedLotacoes.filter((_, i) => i !== index));
    }
  };

  const handleAddNewLotacao = () => {
    setAdd(true);

    console.log({ add });
    if (confirmedLotacoes.every((status) => status)) {
      setCurrentLotacoes([...currentLotacoes, { nomeLotacao: "", sigla: "" }]);
      setConfirmedLotacoes([...confirmedLotacoes, false]);
    }
  };

  const handleConfirmLotacao = (index) => {
    const newConfirmedLotacoes = [...confirmedLotacoes];
    newConfirmedLotacoes[index] = true;
    setConfirmedLotacoes(newConfirmedLotacoes);
    handleAddLotacao(); // Adiciona as lotações confirmadas à lista de lotações
  };

  const handleLotacaoChange = (index, field, value) => {
    const newLotacoes = [...lotacoes];
    newLotacoes[index] = { ...newLotacoes[index], [field]: value };
    setLotacoes(newLotacoes);
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
        <h3>Dados de Lotações</h3>
        <div className="section-doublebox">
          <FieldText
            label="Lotação*"
            value={lotacao}
            onChange={(e) => setLotacao(e.target.value)}
            onBlur={(e) => handleBlur(e, "lotacao")}
            erro={errors["lotacao"]}
          />
          <FieldText
            label="Sigla*"
            value={sigla}
            onChange={(e) => setSigla(e.target.value)}
            onBlur={(e) => handleBlur(e, "sigla")}
            erro={errors["sigla"]}
          />
        </div>
        <h3>
          Adicionar Nova Lotação{" "}
          <AddCircleOutlineIcon onClick={handleAddNewLotacao} />
        </h3>

        <div>
          {add &&
            currentLotacoes.map((lotacao, index) => (
              <div
                key={`current-${index}`}
                className="section-lotacoes-form"
                style={{ marginBottom: "50px" }}
              >
                <h3>Nova Lotação</h3>
                <FieldText
                  label="Nome"
                  value={lotacao.nomeLotacao}
                  onChange={(e) =>
                    handleCurrentLotacaoChange(
                      index,
                      "nomeLotacao",
                      e.target.value
                    )
                  }
                  onBlur={(e) => handleBlur(e, `currentLotacao-${index}-nome`)}
                  erro={errors[`currentLotacao-${index}-nome`]}
                />
                <FieldText
                  label="Sigla"
                  value={lotacao.sigla}
                  onChange={(e) =>
                    handleCurrentLotacaoChange(index, "sigla", e.target.value)
                  }
                  onBlur={(e) => handleBlur(e, `currentLotacao-${index}-sigla`)}
                  erro={errors[`currentLotacao-${index}-sigla`]}
                />
                <PrimaryButton
                  text="Confirmar Lotação"
                  onClick={() => handleConfirmLotacao(index)}
                />
              </div>
            ))}
        </div>

        <div>
          {lotacoes.map((lotacao, index) => (
            <div
              key={`confirmed-${index}`}
              className="section-lotacoes-form"
              style={{ marginBottom: "50px" }}
            >
              <h3>Lotação Confirmada {index + 1}</h3>
              <FieldText
                label="Nome"
                value={lotacao.nomeLotacao}
                onChange={(e) =>
                  handleLotacaoChange(index, "nomeLotacao", e.target.value)
                }
              />
              <FieldText
                label="Sigla"
                value={lotacao.sigla}
                onChange={(e) =>
                  handleLotacaoChange(index, "sigla", e.target.value)
                }
              />
              <PrimaryButton
                text="Remover Lotação"
                onClick={() => handleRemoveLotacao(index)}
              />
            </div>
          ))}
        </div>
        <PrimaryButton text="Cadastrar" onClick={handleSubmit} />
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={() => setOpenError(false)}
        >
          <Alert onClose={() => setOpenError("")} severity="error">
            {openError}
          </Alert>
        </Snackbar>

        <Modal
          width="338px"
          alertTitle="Órgão cadastrado com sucesso!"
          show={showModal}
        >
          <SecondaryButton
            key={"modalButtons"}
            text="OK"
            onClick={handleCloseDialog}
            width="338px"
          />
        </Modal>
      </div>
    </section>
  );
}
