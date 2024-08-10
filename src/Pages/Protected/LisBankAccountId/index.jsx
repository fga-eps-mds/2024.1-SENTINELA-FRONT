import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldSelect from "../../../Components/FieldSelect";
import FieldText from "../../../Components/FieldText";
import "./index.css";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import {
  getBankAccount,
  deleteBankAccount,
  updateBankAccount,
} from "../../../Services/bankAccountService";
import Modal from "../../../Components/Moldal";

const BankAccountId = () => {
  const [name, setName] = useState("");
  const [pix, setPix] = useState("");
  const [bank, setBank] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [dv, setDv] = useState("");
  const [status, setStatus] = useState("");
  const [agency, setAgency] = useState("");
  const [openError, setOpenError] = useState(false);

  const { user } = useAuth();
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const listAccountType = [
    "Conta Corrente",
    "Poupança",
    "Investimento",
    "Caixa",
  ];
  const listStatus = ["Ativo", "Inativo"];

  const [openSave, setOpenSave] = useState(false);
  const [openDeleteBankAccount, setOpenDeleteBankAccount] = useState(false);
  const [openVerificationDelete, setOpenVerificationDelete] = useState(false);

  const handleChangeAccountType = (e) => {
    setAccountType(e.target.value);
  };

  // Máscaras
  const agencia = (value) => {
    return value.replace(/\D/g, "").slice(0, 5);
  };

  const numeroConta = (value) => {
    return value.replace(/\D/g, "").slice(0, 11);
  };

  const digitverificator = (value) => {
    return value.replace(/\D/g, "").slice(0, 1);
  };

  const handleDeleteBank = async () => {
    try {
      await deleteBankAccount(id);
      setOpenVerificationDelete(false);
      setOpenDeleteBankAccount(true);
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  const saveUpdate = () => {
    handleUpdate();
    setOpenSave(true);
  };

  const buttons = [
    <SideButton
      key="home"
      text="PÁGINA INICIAL"
      onClick={() => navigate("/home/")}
    />,
    <SideButton key="filiacao" text="CADASTROS" />,
    <SideButton
      key="financeiro"
      text="FINANCEIRO"
      onClick={() => navigate("/finance/")}
    />,
    <SideButton key="beneficios" text="BENEFÍCIOS" />,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBankAccount(id);
        console.log(result);
        setName(result.name || "");
        setPix(result.pix || "");
        setBank(result.bank || "");
        setAccountType(result.accountType || "");
        setAccountNumber(result.accountNumber || "");
        setDv(result.dv || "");
        setStatus(result.status || "");
        setAgency(result.agency || "");
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = async () => {
    // Construir o objeto de dados atualizados dinamicamente
    const updatedData = {
      ...(name && { name }), // Inclui name se não estiver vazio
      ...(pix && { pix }), // Inclui pix se não estiver vazio
      ...(bank && { bank }), // Inclui bank se não estiver vazio
      ...(accountType && { accountType }), // Inclui accountType se não estiver vazio
      ...(accountNumber && { accountNumber }), // Inclui accountNumber se não estiver vazio
      ...(dv && { dv }), // Inclui dv se não estiver vazio
      ...(status && { status }), // Inclui status se não estiver vazio
      ...(agency && { agency }), // Inclui agency se não estiver vazio
    };

    console.log("Dados atualizados:", updatedData);

    try {
      const response = await updateBankAccount(id, updatedData);
      console.log("Resposta do servidor:", response);
      return response;
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return user ? (
    <section className="bank-container">
      <div>
        <SideBar className="side-menu" buttons={buttons} />
      </div>
      <div className="section">
        <h1>Visualização de Conta Bancária</h1>
        <div className="form">
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
        <div className="edit-buttons">
          <SecondaryButton
            text="Deletar"
            onClick={() => {
              setOpenVerificationDelete(true);
            }}
          />
          <PrimaryButton text="Salvar" onClick={saveUpdate} />
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
        show={openDeleteBankAccount}
        width="400px"
        alertTitle="Conta bancária excluída"
        alert=""
      >
        <SecondaryButton
          text="ok"
          onClick={() => navigate("/finance/")}
          style={{ width: "250px", marginTop: "10px" }}
        />
      </Modal>

      <Modal
        show={openVerificationDelete}
        width="400px"
        alertTitle="Deseja deletar conta bancária do sistema?"
        alert=""
      >
        <SecondaryButton
          text="Excluir Conta bancária"
          onClick={handleDeleteBank}
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
          onClick={() => navigate("/finance/listBankAccount")}
          style={{ width: "250px", marginTop: "10px" }}
        />
      </Modal>
    </section>
  ) : null;
};

export default BankAccountId;
