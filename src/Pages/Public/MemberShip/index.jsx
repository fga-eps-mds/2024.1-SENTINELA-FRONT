import React, { useState } from 'react';
import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localização desejada para o dayjs
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importa o adaptador Dayjs
import FieldText from "../../../Components/FieldText"
import DataSelect from "../../../Components/DataSelect"
import FieldSelect from "../../../Components/FieldSelect"
import { useFetcher } from 'react-router-dom';


const MemberShip = () => {
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [uf_naturalidade, setUfNaturalidade] = useState('');
  const [uf_orgao , setUfOrgao] = useState('');
  const [uf_endereco, setUfEndereco] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [dataContratacao, setDataContratacao] = useState(null);
  const [dataNascimento, setDataNascimento] = useState(null);
  const [dataExpedicao, setDataExpedicao] = useState(null);
  const [cargo, setCargo] = useState('');
  const [lotação, setLotação] = useState('');
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState(''); 
  const [dataNasc, setDataNasc] = useState(null);
  const [naturalidade, setNaturalidade] = useState('');
  const [rg, setRg] = useState('');
  const [orgao, setOrgao] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [nomePai, setNomePai] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');
  const [posto, setPosto] = useState('');
  const [orgaoExpeditor, setOrgaoExpeditor] = useState('');
  const [situacaoAtual, setSituacaoAtual] = useState('');
  const [parentesco, setParentesco] = useState('');

  

  const tipoSanguineoList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const sexoList = ['Masculino', 'Feminino', 'Outro'];
  const ufList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  const estadoCivilList = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'União Estável'];
  const escolaridadeList = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-Graduação', 'Mestrado', 'Doutorado'];
  const cargoList = ['Advogado', 'Agente', 'Outro'];
  const lotaçãoList = ['Sede', 'Out', 'Outro'];
  const situacaoAtualList = ['Ativo', 'Inativo', 'Aposentado', 'Pensionista', 'Licenciado', 'Exonerado', 'Falecido'];

  const [dependentes, setDependentes] = useState([]);
  const [showDependentForm, setShowDependentForm] = useState(false);
  const [currentDependent, setCurrentDependent] = useState({ nomeCompleto: '', dataDeNascimento: '', parentesco: '' });
  
  const handleChange = (event) => {
    setTipoSanguineo(event.target.value);
  };
  
  const handleChangeUf = (event) => {
    setUfNaturalidade(event.target.value);
  };

  const handleChangeUfOrgao = (event) => {
    setUfOrgao(event.target.value);
  };

  const handleChangeUfEndereco = (event) => {
    setUfEndereco(event.target.value);
  };

  const handleAddDependent = () => {
    setShowDependentForm(true);
  };

  const handleDependentChange = (field, value) => {
    setCurrentDependent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDependent = () => {
    setDependentes([...dependentes, currentDependent]);
    setCurrentDependent({ nomeCompleto: '', dataDeNascimento: '', parentesco: '' });
    setShowDependentForm(true);
  };

  const handleRemoveDependent = (index) => {
    const newDependentes = dependentes.filter((_, i) => i !== index);
    setDependentes(newDependentes);
  };

  const handleChangeTipoSanguineo = (event) => {
    setTipoSanguineo(event.target.value);
  };

  const handleChangeSexo = (event) => {
    setSexo(event.target.value);
  };

  const handleChangeEstadoCivil = (event) => {
    setEstadoCivil(event.target.value);
  };

  const handleChangeEscolaridade = (event) => {
    setEscolaridade(event.target.value);
  };
  const handleChangeSituacaoAtual = (event) => {
    setSituacaoAtual(event.target.value);
  };

  const buttons = [
    <SideButton key="login" text="Login" />,
    <SideButton key="filiacao" text="Filiação" />,
    <SideButton key="sobre" text="Sobre" />,
  ];

  return (
    <section className="container">

      <SideBar buttons={buttons} />

      <div className='forms-container'>

        <h1>Formulário de Filiação</h1>

        <h3> Dados Pessoais </h3>

        <div className="section-form">
          <FieldText
            id='formItem'
            label="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <FieldSelect
            className='formItem'
            label="Tipo Sanguíneo"
            value={tipoSanguineo}
            onChange={handleChangeTipoSanguineo}
            options={tipoSanguineoList}
          />

          <FieldText 
            label="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
             />

          <DataSelect
            label="Data de Nascimento"
            value={dataNascimento}
            onChange={(newValue) => setDataNascimento(newValue)}
          />

          <FieldSelect
            label="Sexo"
            value={sexo}
            onChange={handleChangeSexo}
            options={sexoList}
          />

          <div className='double-box'>
            <FieldText
            label="Naturalidade"
            value={naturalidade}
            onChange={(e) => setNaturalidade(e.target.value)}
            />
            
            <FieldSelect
              label="UF"
              value={uf_naturalidade}
              onChange={handleChangeUf}
              options={ufList}
            />
          </div>

          <FieldSelect
            label="Estado Civil"
            value={estadoCivil}
            onChange={handleChangeEstadoCivil}
            options={estadoCivilList}
          />

          <FieldSelect
            label="Escolaridade"
            value={escolaridade}
            onChange={handleChangeEscolaridade}
            options={escolaridadeList}
          />

          <FieldText 
            label="RG"
            value={rg}
            onChange={(e) => setRg(e.target.value)}
             />

          <div className='double-box'>
            <FieldText  
              label = "Órgão Expeditor"
              value = {orgaoExpeditor} 
              onChange={(e) => setOrgaoExpeditor(e.target.value)}/>

            <FieldSelect
              label="UF"
              value={uf_orgao}
              onChange={handleChangeUfOrgao}
              options={ufList}
            />
          </div>

          <FieldText
            label = "CPF" 
            value = {cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <DataSelect
            label="Data de Expedição"
            value={dataExpedicao}
            onChange={(newValue) => setDataExpedicao(newValue)}
          />

          <FieldText
            label = "Nome do Pai" 
            value = {nomePai}
            onChange={(e) => setNomePai(e.target.value)}/>

          <FieldText
            label = "Nome da Mãe" 
            value = {nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}/>  
        
        </div>

        <h3> Dados de Contato </h3>

          
          <FieldText
            label = "E-mail" 
            value = {email}
            onChange={(e) => setEmail(e.target.value)}/>

        <div className="section-form">

          <div className='double-box'>
          <FieldText
            label = "Celular" 
            value = {celular}
            onChange={(e) => setCelular(e.target.value)}/>

          <FieldText
            label = "Telefone" 
            value = {telefone}
            onChange={(e) => setTelefone(e.target.value)}/>
          </div>
        </div>

        <h3> Endereço </h3>
        <div className="section-form">
        <FieldText
            label = "CEP" 
            value = {cep}
            onChange={(e) => setCep(e.target.value)}/>

        <FieldText
            label = "Cidade" 
            value = {cidade}
            onChange={(e) => setCidade(e.target.value)}/>

          <FieldSelect
            label="UF"
            value={uf_endereco}
            onChange={handleChangeUfEndereco}
            options={ufList}
          />

          <FieldText
            label = "Logradouro" 
            value = {logradouro}
            onChange={(e) => setLogradouro(e.target.value)}/>

          <FieldText
            label = "Complemento" 
            value = {complemento}
            onChange={(e) => setComplemento(e.target.value)}/>
        </div>

        <h3> Dados de Contratação </h3>
        <div className="section-form">
          <FieldSelect
            label="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            options={cargoList}
          />

          <DataSelect
            label="Data de Contratação"
            value={dataContratacao}
            onChange={(newValue) => setDataContratacao(newValue)}
          />
          <FieldSelect
            label="Lotação"
            value={lotação}
            onChange={(e) => setLotação(e.target.value)}
            options={lotaçãoList}
          />

          <FieldText
            label = "Órgão" 
            value = {orgao}
            onChange={(e) => setOrgao(e.target.value)}/>
          <FieldText
            label = "Posto de Trabalho" 
            value = {posto}
            onChange={(e) => setPosto(e.target.value)}/>
          
            
          <FieldSelect
            label="Situação Atual"
            value={situacaoAtual}
            onChange={(e) => setSituacaoAtual(e.target.value)}
            options={situacaoAtualList}
          />

          <h3> Dependentes </h3>
          <div> 
            <buttons onClick={handleAddDependent}>Adicionar Dependente</buttons>
            {showDependentForm && (
              <div className="section-form">
                <FieldText
                  label="Nome Completo"
                  value={currentDependent.nomeCompleto}
                  onChange={(e) => handleDependentChange('nomeCompleto', e.target.value)}
                />
                <DataSelect
                  label="Data de Nascimento"
                  value={dataNasc}
                  onChange={(newValue) => setDataNasc(newValue)}
                />
                <FieldText
                  label="Parentesco"
                  value={currentDependent.parentesco}
                  onChange={(e) => handleDependentChange('parentesco', e.target.value)}
                />
                <buttons onClick={handleSaveDependent}>Salvar Dependente</buttons>
                {dependentes.map((dependent, index) => (
                  <div key={index}>
                    <p>Nome: {dependent.nomeCompleto}</p>
                    <p>Data de Nascimento: {dependent.dataDeNascimento}</p>
                    <p>Parentesco: {dependent.parentesco}</p>
                    <p>--------------------</p>
                    <buttons onClick={() => handleRemoveDependent(index)}>Remover Dependente</buttons>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberShip;