import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import FieldText from "../../../../Components/FieldText";
import "./index.css";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Modal from "../../../../Components/Modal";
import {
  getOrganById,
  deleteOrganById,
  updateOrgan,
} from "../../../../Services/organService";

export const OrganId = () => {
  const [orgao, setOrgao] = useState("");
  const [lotacoes, setLotacoes] = useState([{ nomeLotacao: "", sigla: "" }]);
  const [errors, setErrors] = useState({});
  const [openError, setOpenError] = useState(false);
  const { state } = useLocation();
  const organsId = state?.organsId;
  const navigate = useNavigate();

  const [openSave, setOpenSave] = useState(false);
  const [openDeleteOrgan, setOpenDeleteOrgan] = useState(false);
  const [openVerificationDelete, setOpenVerificationDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrganById(organsId);
        setOrgao(result.orgao || "");
        setLotacoes(result.lotacao || [{ nomeLotacao: "", sigla: "" }]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (organsId) {
      fetchData();
    }
  }, [organsId]);

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

  const handleLotacaoChange = (index, field, value) => {
    const newLotacoes = [...lotacoes];
    newLotacoes[index] = { ...newLotacoes[index], [field]: value };
    setLotacoes(newLotacoes);
  };

  const handleAddLotacao = () => {
    setLotacoes([...lotacoes, { nomeLotacao: "", sigla: "" }]);
  };

  const handleRemoveLotacao = (index) => {
    if (lotacoes.length === 1) {
      setErrors({
        ...errors,
        "lotacao-removal": "Você deve manter pelo menos uma lotação.",
      });
      setOpenError(true);
      return;
    }

    setLotacoes(lotacoes.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    // Verifica se os campos obrigatórios estão preenchidos
    let hasError = false;
    const newErrors = {};

    if (orgao.trim() === "") {
      newErrors["orgao"] = "O campo órgão é obrigatório";
      hasError = true;
    }

    lotacoes.forEach((lotacao, index) => {
      if (lotacao.nomeLotacao.trim() === "") {
        newErrors[`lotacao-${index}-nome`] =
          "O campo Nome da Lotação é obrigatório";
        hasError = true;
      }
      if (lotacao.sigla.trim() === "") {
        newErrors[`lotacao-${index}-sigla`] = "O campo Sigla é obrigatório";
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      setOpenError(true);
      return;
    }

    const updatedData = {
      orgao,
      lotacao: lotacoes.filter(
        (lotacao) => lotacao.nomeLotacao && lotacao.sigla
      ), // Apenas lotações completas
    };

    console.log("Dados atualizados:", updatedData);

    try {
      const response = await updateOrgan(organsId, updatedData);
      console.log("Resposta do servidor:", response);
      setOpenSave(true);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setOpenError(true);
    }
  };

  const handleDeleteOrgan = async () => {
    try {
      setOpenVerificationDelete(false);
      setOpenDeleteOrgan(true);
      const response = await deleteOrganById(organsId);
      console.log("Resposta do servidor:", response);
    } catch (error) {
      console.error("Erro ao excluir orgao:", error);
    }
  };

  return (
    <div className="container-organ">
      <div className="forms-container-organ">
        <h1>Editar Órgão</h1>

        <h3>Dados do Órgão</h3>

        <FieldText
          label="Órgão *"
          value={orgao}
          onChange={(e) => setOrgao(e.target.value)}
          onBlur={(e) => handleBlur(e, "orgao")}
          erro={errors["orgao"]}
        />

        <h3>Dados de Lotação</h3>
        {lotacoes.map((lotacao, index) => (
          <div key={index} className="section-doublebox">
            <FieldText
              label="Nome da Lotação *"
              value={lotacao.nomeLotacao}
              onChange={(e) =>
                handleLotacaoChange(index, "nomeLotacao", e.target.value)
              }
              onBlur={(e) => handleBlur(e, `lotacao-${index}-nome`)}
              erro={errors[`lotacao-${index}-nome`]}
            />
            <FieldText
              label="Sigla *"
              value={lotacao.sigla}
              onChange={(e) =>
                handleLotacaoChange(index, "sigla", e.target.value)
              }
              onBlur={(e) => handleBlur(e, `lotacao-${index}-sigla`)}
              erro={errors[`lotacao-${index}-sigla`]}
            />
            <div className="secondarybutton">
              <SecondaryButton
                className="secondary-button-responsive"
                text="Remover Lotação"
                onClick={() => handleRemoveLotacao(index)}
              />
            </div>
          </div>
        ))}

        <div className="adition-button">
          <PrimaryButton
            text="Adicionar Nova Lotação"
            onClick={handleAddLotacao}
          />
        </div>

        <div className="edit-buttons">
          <SecondaryButton
            text="Deletar"
            onClick={() => {
              setOpenVerificationDelete(true);
            }}
          />
          <PrimaryButton text="Salvar" onClick={handleUpdate} />
        </div>
      </div>

      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
      >
        <Alert onClose={() => setOpenError(false)} severity="error">
          {errors["lotacao-removal"] ||
            "Certifique-se de que todos os campos obrigatórios estão preenchidos"}
        </Alert>
      </Snackbar>

      <Modal
        show={openDeleteOrgan}
        width="400px"
        alertTitle="Órgão excluída"
        alert=""
      >
        <SecondaryButton
          text="ok"
          onClick={() => navigate("/organ/list")}
          style={{ width: "250px", marginTop: "10px" }}
        />
      </Modal>

      <Modal
        show={openVerificationDelete}
        width="400px"
        alertTitle="Deseja deletar órgão do sistema?"
        alert=""
      >
        <SecondaryButton
          text="Excluir órgão"
          onClick={handleDeleteOrgan}
          style={{ width: "250px", marginTop: "10px" }}
        />
        <SecondaryButton
          text="Cancelar e manter cadastro"
          onClick={() => setOpenVerificationDelete(false)}
          style={{ width: "250px", marginTop: "10px" }}
        />
      </Modal>

      <Modal
        show={openSave}
        width="400px"
        alertTitle="Alterações salvas"
        alert=""
      >
        <SecondaryButton
          text="ok"
          onClick={() => navigate("/organ/list")}
          style={{ width: "250px", marginTop: "10px" }}
        />
      </Modal>
    </div>
  );
};

export default OrganId;
