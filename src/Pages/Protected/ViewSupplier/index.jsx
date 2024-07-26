import { useEffect, useState } from "react";
import "./index.css";
import "../../../index.css";
//import "dayjs/locale/pt-br";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
//import FieldNumber from "../../../Components/FieldNumber";
//import Checklist from "../../../Components/Checklist";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import { APIBank } from "../../../Services/BaseService";
//import { /*ToggleButton,*/ Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function ViewSupplier() {
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

  const buttons = [
    <SideButton key="home" text="Página inicial" />,
    <SideButton key="cadastros" text="Cadastros" />,
    <SideButton key="financeiro" text="Financeiro" />,
  ];

  const tipoPessoaList = ["Jurídica", "Física"];
  const statusFornecedorList = ["Ativo", "Inativo"];
  const naturezaTransacaoList = ["Receita", "Despesa"];
  const uf_enderecoList = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

  const mascaraCelular = (celular) => {
    let formattedCelular = celular.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (formattedCelular.length > 11) {
      formattedCelular = formattedCelular.slice(0, 11); // Limita a 11 dígitos numéricos
    }
    return formattedCelular
      .replace(/^(\d{2})(\d)/g, "($1) $2") // Adiciona parênteses em volta dos dois primeiros dígitos
      .replace(/(\d{5})(\d{4})$/, "$1-$2"); // Adiciona traço entre o quarto ou quinto e o último grupo de dígitos
  };

  const mascaraTelefone = (telefone) => {
    let formattedTelefone = telefone.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (formattedTelefone.length > 10) {
      formattedTelefone = formattedTelefone.slice(0, 10); // Limita a 11 dígitos numéricos
    }
    return formattedTelefone
      .replace(/^(\d{2})(\d)/g, "($1) $2") // Adiciona parênteses em volta dos dois primeiros dígitos
      .replace(/(\d{4})(\d{4})$/, "$1-$2"); // Adiciona traço entre o quarto ou quinto e o último grupo de dígitos
  };

  const mascaraCEP = (cep) => {
    let formattedCEP = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (formattedCEP.length > 8) {
      formattedCEP = formattedCEP.slice(0, 8); // Limita a 8 dígitos numéricos
    }
    return formattedCEP.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona traço após os cinco primeiros dígitos
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

  useEffect(() => {
    getSupplierFormById();
  }, []);
  
  const getSupplierFormById = async () => { // Busca usuario no banco
    try {
      const response = await APIBank.get(`/SupplierForm/:id/${storagedUser.supplier._id}`, {
        headers: { 'Authorization': `Bearer ${storagedUser.token}` }
      });
      setNome(response.data.nome);
      setTipoPessoa(response.data.tipoPessoa);
      setCpfCnpj(response.data.cpfCnpj);
      setStatusFornecedor(response.data.statusFornecedor);
      setNaturezaTransacao(response.data.naturezaTransacao);
      setEmail(response.data.email);
      setNomeContato(response.data.nomeContato);
      setCelular(response.data.celular);
      setTelefone(response.data.telefone);
      setCep(response.data.cep);
      setCidade(response.data.celular);
      setUfEndereco(response.data.uf_endereco);
      setLogradouro(response.data.logradouro);
      setComplemento(response.data.complemento);
      setNomeBanco(response.data.nomeBanco);
      setAgencia(response.data.agencia);
      setNumeroBanco(response.data.numeroBanco);
      setDv(response.data.dv);
      setChavePix(response.data.chavePix);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container">
      <SideBar className="side-menu" buttons={buttons} />

      <div className="forms-container">
        <h1>Visualização de fornecedor</h1>

          <h3>Dados pessoais</h3>
          <FieldText
            label="Nome/Razão social"
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

      <div className="double-buttons">
        <SecondaryButton text="Deletar" onClick={() => {}} />

        <PrimaryButton text="Salvar" onClick={() => {}} />
      </div>
      
      </div>

    </section>
  );
}
