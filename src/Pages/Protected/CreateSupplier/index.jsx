import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import Modal from "../../../Components/Modal";
import "dayjs/locale/pt-br";
import { createSupplierForm } from "../../../Services/supplierService";

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
      .replace(/^(\d{2})(\d)/g, "($1) $2") // Adiciona parênteses em volta dos dois primeiros dígitos
      .replace(/(\d{4})(\d{4})$/, "$1-$2"); // Adiciona traço entre o quarto ou quinto e o último grupo de dígitos
  };

  const mascaraCEP = (cep) => {
    let formattedCEP = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (formattedCEP.length > 8) {
      formattedCEP = formattedCEP.slice(0, 8); // Limita a 8 dígitos numéricos
    }
    return formattedCEP.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona traço após os cinco primeiros dígitos
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

  const getUserName = () => {
    const tokenString = localStorage.getItem("@App:user");
    if (tokenString) {
      const user = JSON.parse(tokenString);
      return user?.user?.name || "Usuário";
    }
    return "Usuário";
  };

  const handleSubmit = async () => {
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
    createSupplierForm(supplierData);
    setShowModal(true);
  };

  const handleCloseDialog = () => {
    setShowModal(false);
    navigate("/fornecedores");
  };

  const modalButton = [
    <SecondaryButton
      key={"modalButtons"}
      text="OK"
      onClick={handleCloseDialog}
      width="338px"
    />,
  ];

  return (
    <div className="container">
      <SideBar className="side-menu" />

      <div className="forms-container">
        <h1>Cadastro de fornecedor</h1>

        <h3>Dados pessoais</h3>

        <FieldText
          label="Nome/Razão Social"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <div className="section-form">
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

        <div className="section-form">
          <FieldText
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="section-form">
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

        <div className="section-form">
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
          <PrimaryButton text="CADASTRAR" onClick={handleSubmit} />
        </div>

        <Modal
          width="338px"
          alertTitle="Cadastro de usuário concluído"
          show={showModal}
          buttons={modalButton}
        >
          <div></div>
        </Modal>
      </div>
    </div>
  );
}
