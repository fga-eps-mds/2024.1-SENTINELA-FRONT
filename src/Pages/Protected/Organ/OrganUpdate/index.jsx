import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../Context/auth";
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

const OrganId = () => {
  const [orgao, setOrgao] = useState("");
  const [lotacoes, setLotacoes] = useState([{ nomeLotacao: "", sigla: "" }]);
  const [errors, setErrors] = useState({});
  const [openError, setOpenError] = useState(false);

  const { user } = useAuth();
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [openSave, setOpenSave] = useState(false);
  const [openDeleteOrgan, setOpenDeleteOrgan] = useState(false);
  const [openVerificationDelete, setOpenVerificationDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Buscando dados do órgão com ID:", id);
        const result = await getOrganById(id);
        console.log("Dados recebidos:", result.orgao, result.lotacao);
        setOrgao(result.orgao || "");
        setLotacoes(result.lotacao || [{ nomeLotacao: "", sigla: "" }]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
      const response = await updateOrgan(id, updatedData);
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
      const response = await deleteOrganById(id);
      console.log("Resposta do servidor:", response);
    } catch (error) {
      console.error("Erro ao excluir orgao:", error);
    }
  };

  return user ? (
    <div className="container-benefits">
      <div className="forms-container-benefits">
        <h1>Editar Órgão</h1>

        <FieldText
          label="Órgão *"
          value={orgao}
          onChange={(e) => setOrgao(e.target.value)}
          onBlur={(e) => handleBlur(e, "orgao")}
          erro={errors["orgao"]}
        />

        <h3>Lotação</h3>
        {lotacoes.map((lotacao, index) => (
          <div
            key={index}
            className="section-lotacoes-form"
            style={{ marginBottom: "20px" }}
          >
            <FieldText
              label="Nome da Lotação"
              value={lotacao.nomeLotacao}
              onChange={(e) =>
                handleLotacaoChange(index, "nomeLotacao", e.target.value)
              }
              onBlur={(e) => handleBlur(e, `lotacao-${index}-nome`)}
              erro={errors[`lotacao-${index}-nome`]}
            />
            <FieldText
              label="Sigla"
              value={lotacao.sigla}
              onChange={(e) =>
                handleLotacaoChange(index, "sigla", e.target.value)
              }
              onBlur={(e) => handleBlur(e, `lotacao-${index}-sigla`)}
              erro={errors[`lotacao-${index}-sigla`]}
            />
            <SecondaryButton
              text="Remover Lotação"
              onClick={() => handleRemoveLotacao(index)}
            />
          </div>
        ))}
        <PrimaryButton
          text="Adicionar Nova Lotação"
          onClick={handleAddLotacao}
        />

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
          Certifique-se de que todos os campos obrigatórios estão preenchidos
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
  ) : null;
};

export default OrganId;
