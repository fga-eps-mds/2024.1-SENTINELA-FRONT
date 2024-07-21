import React, { useState } from "react";
import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
//import PrimaryButton from "../../../Components/PrimaryButton";
import "dayjs/locale/pt-br";
//import { createSupplier } from "../../../";

//const Supplier = () => {
export default function Supplier() {

  console.log("Supplier called");
  const [nome, setNome] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  const [cpf, setCpf] = useState("");
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

  const tipoPessoaList = ["Jurídica", "Física"];
  const statusFornecedorList = ["Ativo", "Inativo"];
  const naturezaTransacaoList = ["Receita", "Despesa"];
  const uf_enderecoList = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

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

  const buttons = [
    <SideButton key="home" text="Página inicial" />,
    <SideButton key="cadastros" text="Cadastros" />,
    <SideButton key="financeiro" text="Financeiro" />,
  ];

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    const formData = {
      nome,
      tipoPessoa,
      cpf,
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
    createdSupplier(formData);
  };

  return (
    <section className="container">
      <div className="bar-container">
        <SideBar buttons={buttons} />
      </div>

      <div className="forms-container">
        <h1>Cadastro de fornecedor</h1>

        <h3>Dados pessoais</h3>

        <div className="section-form">
          <FieldText
            label="Nome/Razão Social"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <FieldSelect
            label="Classificação de pessoa"
            value={tipoPessoa}
            onChange={handleChangeTipoPessoa}
            options={tipoPessoaList}
          />

          <FieldText
            label="CPF/CNPJ"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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

          <FieldText
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <h3>Dados de Contato</h3>

        <div className="section-form">
          <FieldText
            label="Nome do contato"
            value={nomeContato}
            onChange={(e) => setNomeContato(e.target.value)}
          />

          <FieldText
            label="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />

          <FieldText
            label="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <h3>Endereço</h3>

        <div className="section-form">
          <FieldText
            label="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />

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
          
          <FieldText
            label="Chave Pix"
            value={chavePix}
            onChange={(e) => setChavePix(e.target.value)}
          />

        </div>
        
        <button onClick={() => handleSubmit()}>CADASTRAR</button>

      </div>
    </section>
  );
}

//export default Supplier;
