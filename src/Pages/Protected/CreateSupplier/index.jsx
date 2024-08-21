import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import Modal from "../../../Components/Modal";
import { createSupplierForm } from "../../../Services/supplierService";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { isValidEmail } from "../../../Utils/validators";

export default function CreateSupplier() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [statusFornecedor, setStatusFornecedor] = useState("");
  const [naturezaTransacao, setNaturezaTransacao] = useState("");
  const [email, setEmail] = useState("");
  const [nomeContato, setNomeContato] = useState("");
  const [celular, setCelular] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf_endereco, setUfEndereco] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [nomeBanco, setNomeBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [numeroBanco, setNumeroBanco] = useState("");
  const [dv, setDv] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openError, setOpenError] = useState(false);

  const tipoPessoaList = ["Jurídica", "Física"];
  const statusFornecedorList = ["Ativo", "Inativo"];
  const naturezaTransacaoList = ["Receita", "Despesa"];
  const uf_enderecoList = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const mascaraCPFouCNPJ = (cpfCnpj) => {
    let formattedValue = cpfCnpj.replace(/\D/g, "");

    if (formattedValue.length > 14) {
      formattedValue = formattedValue.slice(0, 14);
    }

    if (formattedValue.length <= 11) {
      return formattedValue
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return formattedValue
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };

  const mascaraCelular = (celular) => {
    let formattedCelular = celular.replace(/\D/g, "");
    if (formattedCelular.length > 11) {
      formattedCelular = formattedCelular.slice(0, 11);
    }
    return formattedCelular
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  };

  const mascaraTelefone = (telefone) => {
    let formattedTelefone = telefone.replace(/\D/g, "");
    if (formattedTelefone.length > 10) {
      formattedTelefone = formattedTelefone.slice(0, 10);
    }
    return formattedTelefone
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{4})(\d{4})$/, "$1-$2");
  };

  const mascaraCEP = (cep) => {
    let formattedCEP = cep.replace(/\D/g, "");
    if (formattedCEP.length > 8) {
      formattedCEP = formattedCEP.slice(0, 8);
    }
    return formattedCEP.replace(/(\d{5})(\d)/, "$1-$2");
  };

  const handleChangeTipoPessoa = (event) => {
    setTipoPessoa(event.target.value);
  };

  const handleChangeStatusFornecedor = (event) => {
    setStatusFornecedor(event.target.value);
  };

  const handleChangeNaturezaTransacao = (event) => {
    setNaturezaTransacao(event.target.value);
  };

  const handleChangeUf_endereco = (event) => {
    setUfEndereco(event.target.value);
  };

  const isValidCPForCNPJ = (cpfCnpj) => {
    if (!cpfCnpj) {
      return { isValid: true };
    }

    const cleanedValue = cpfCnpj.replace(/\D/g, ""); // Remove non-numeric characters

    if (cleanedValue.length === 11) {
      return { isValid: true };
    } else if (cleanedValue.length === 14) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: "O CPF ou CNPJ fornecido não é válido.",
      };
    }
  };

  const isValidTelefone = (telefone) => {
    const cleanedNumber = telefone.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (!cleanedNumber) {
      return { isValid: true };
    }

    if (cleanedNumber.length != 10) {
      return { isValid: false, message: "O telefone fornecido não é válido." };
    }

    return { isValid: true };
  };

  const isValidCelular = (celular) => {
    const cleanedNumber = celular.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (!cleanedNumber) {
      return { isValid: true };
    }

    if (cleanedNumber.length != 11) {
      return { isValid: false, message: "O celular fornecido não é válido." };
    }

    return { isValid: true };
  };

  const handleCheck = async () => {
    if (!nome) {
      setOpenError(
        "Certifique-se de que todos os campos obrigatórios estão preenchidos"
      );
      return;
    }

    const emailValidation = isValidEmail(email);
    if (!emailValidation.isValid) {
      setOpenError(emailValidation.message);
      return;
    }

    const telefoneValidation = isValidTelefone(telefone);
    if (!telefoneValidation.isValid) {
      setOpenError(telefoneValidation.message);
      return;
    }

    const cpfCnpjValidation = isValidCPForCNPJ(cpfCnpj);
    if (!cpfCnpjValidation.isValid) {
      setOpenError(cpfCnpjValidation.message);
      return;
    }

    const celularValidation = isValidCelular(celular);
    if (!celularValidation.isValid) {
      setOpenError(celularValidation.message);
      return;
    }

    const supplierData = {
      nome,
      tipoPessoa,
      cpfCnpj,
      statusFornecedor,
      naturezaTransacao,
      email,
      nomeContato,
      celular,
      telefone,
      cep,
      cidade,
      uf_endereco,
      logradouro,
      complemento,
      nomeBanco,
      agencia,
      numeroBanco,
      dv,
      chavePix,
    };
    const erro = await createSupplierForm(supplierData);
    if (!erro) {
      setShowModal(true);
    }
  };

  const handleCloseDialog = () => {
    setShowModal(false);
    navigate("/fornecedores");
  };

  return (
    <div className="container-benefits">
      <div className="forms-container-benefits">
        <h1>Cadastro de fornecedor</h1>

        <h3>Dados pessoais</h3>

        <FieldText
          label="Nome/Razão Social *"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <div className="section-form-benefits">
          <FieldSelect
            label="Classificação de pessoa"
            value={tipoPessoa}
            onChange={handleChangeTipoPessoa}
            options={tipoPessoaList}
          />

          <FieldText
            label="CPF/CNPJ"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(mascaraCPFouCNPJ(e.target.value))}
          />

          <FieldSelect
            label="Status"
            value={statusFornecedor}
            onChange={handleChangeStatusFornecedor}
            options={statusFornecedorList}
          />

          <FieldSelect
            label="Natureza da Transação"
            value={naturezaTransacao}
            onChange={handleChangeNaturezaTransacao}
            options={naturezaTransacaoList}
          />
        </div>

        <h3>Dados de Contato</h3>

        <div className="section-form-benefits">
          <FieldText
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <FieldText
            label="Nome do contato"
            value={nomeContato}
            onChange={(e) => setNomeContato(e.target.value)}
          />

          <FieldText
            label="Celular"
            value={celular}
            onChange={(e) => setCelular(mascaraCelular(e.target.value))}
          />

          <FieldText
            label="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
          />
        </div>

        <h3>Endereço</h3>

        <div className="section-form-benefits">
          <FieldText
            label="CEP"
            value={cep}
            onChange={(e) => setCep(mascaraCEP(e.target.value))}
          />

          <div className="double-box">
            <FieldText
              label="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />

            <FieldSelect
              label="UF"
              value={uf_endereco}
              onChange={handleChangeUf_endereco}
              options={uf_enderecoList}
            />
          </div>

          <FieldText
            label="Logradouro"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />

          <FieldText
            label="Complemento"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>

        <h3>Dados Bancários</h3>

        <div className="section-form-benefits">
          <FieldText
            label="Banco"
            value={nomeBanco}
            onChange={(e) => setNomeBanco(e.target.value)}
          />

          <FieldText
            label="Agência"
            value={agencia}
            onChange={(e) => setAgencia(e.target.value)}
          />

          <FieldText
            label="Número"
            value={numeroBanco}
            onChange={(e) => setNumeroBanco(e.target.value)}
          />

          <FieldText
            label="DV"
            value={dv}
            onChange={(e) => setDv(e.target.value)}
          />
        </div>

        <FieldText
          label="Chave Pix"
          value={chavePix}
          onChange={(e) => setChavePix(e.target.value)}
        />

        <div id="envio">
          <PrimaryButton text="CADASTRAR" onClick={handleCheck} />
        </div>

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
          alertTitle="Cadastro de usuário concluído"
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
    </div>
  );
}
