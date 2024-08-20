import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
import "./index.css";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { createBankAccount } from "../../../../Services/bankAccountService";
import Modal from "../../../../Components/Modal";

const BankAccount = () => {
  const [name, setName] = useState("");
  const [pix, setPix] = useState("");
  const [bank, setBank] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [dv, setDv] = useState("");
  const [status, setStatus] = useState("");
  const [agency, setAgency] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openErrorUnique, setOpenErrorUnique] = useState(false);

  //const { user } = useAuth();
  const navigate = useNavigate();
  const [successCreate, setSuccessCreate] = useState(false);

  const listAccountType = [
    "Conta Corrente",
    "Poupança",
    "Investimento",
    "Caixa",
  ];
  const listStatus = ["Ativo", "Inativo"];

  const handleChangeAccountType = (e) => {
    setAccountType(e.target.value);
  };

  const handleCheck = () => {
    if (!name || !accountType || !bank || !status) {
      setOpenError(true);
    } else {
      const formData = {
        name,
        pix,
        bank,
        accountType,
        accountNumber,
        dv,
        status,
        agency,
      };

      handleSubmit(formData);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await createBankAccount(formData);

      if (
        response &&
        response.status === 409 &&
        response.data.error === "Nome já cadastrado"
      ) {
        // Se o status for 409 e a mensagem de erro indicar nome repetido

        setOpenErrorUnique(true);
      } else if (response && response.status === 201) {
        // Se a resposta for bem-sucedida
        setSuccessCreate(true);
      } else {
        // Outros casos de erro
        console.error(
          "Erro inesperado:",
          response.data.error || "Erro inesperado"
        );
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error.response || error.message);
    }
  };

  //mascaras
  const agencia = (value) => {
    // Remove qualquer caractere que não seja um dígito e limita a 5 caracteres
    return value.replace(/\D/g, "").slice(0, 5);
  };

  const numeroConta = (value) => {
    // Remove qualquer caractere que não seja um dígito e limita a 11 caracteres
    return value.replace(/\D/g, "").slice(0, 11);
  };

  const digitverificator = (value) => {
    // Remove qualquer caractere que não seja um dígito e limita a 5 caracteres
    return value.replace(/\D/g, "").slice(0, 1);
  };

  return (
    <div className="container-benefits">
      <div className="forms-container-benefits">
        <h1>Cadastro de contas bancárias</h1>
        <h3>Dados da Conta Bancária </h3>
        <div className="section-form-benefits">
          <FieldText
            label="Nome *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FieldSelect
            label="Tipo de conta*"
            value={accountType}
            onChange={handleChangeAccountType}
            options={listAccountType}
          />
          <FieldText
            label="Banco *"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          />
          <FieldText
            label="Agência"
            value={agency}
            onChange={(e) => setAgency(agencia(e.target.value))}
          />
          <FieldText
            label="Número da conta"
            value={accountNumber}
            onChange={(e) => setAccountNumber(numeroConta(e.target.value))}
          />
          <FieldText
            label="DV"
            value={dv}
            onChange={(e) => setDv(digitverificator(e.target.value))}
          />
          <FieldText
            label="Pix"
            value={pix}
            onChange={(e) => setPix(e.target.value)}
          />
          <FieldSelect
            label="Status *"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={listStatus}
          />
        </div>

        <div id="envio">
          <PrimaryButton text="CADASTRAR" onClick={handleCheck} />
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
        <Snackbar
          open={openErrorUnique}
          autoHideDuration={6000}
          onClose={() => setOpenErrorUnique(false)}
        >
          <Alert onClose={() => setOpenErrorUnique(false)} severity="error">
            Nome já cadastrado
          </Alert>
        </Snackbar>

        <Modal
          width="338px"
          alertTitle="Cadastro concluído"
          show={successCreate}
        >
          <SecondaryButton
            key={"modalButtons"}
            text="OK"
            onClick={() => navigate("/finance/list")}
            width="338px"
          />
        </Modal>
      </div>
    </div>
  );
};

export default BankAccount;
