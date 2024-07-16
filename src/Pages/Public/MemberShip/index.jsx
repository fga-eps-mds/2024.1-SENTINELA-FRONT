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

  const handleChange = (event) => {
    setTipoSanguineo(event.target.value);
  };
  const tipoSanguineoList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const sexoList = ['Masculino', 'Feminino', 'Outro'];
  const ufList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  const estadoCivilList = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'União Estável'];
  const escolaridadeList = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-Graduação', 'Mestrado', 'Doutorado'];
  const cargoList = ['Advogado', 'Agente', 'Outro'];
  const lotaçãoList = ['Sede', 'Out', 'Outro'];

  const [dependentes, setDependentes] = useState([]);
  const [showDependentForm, setShowDependentForm] = useState(false);
  const [currentDependent, setCurrentDependent] = useState({ nomeCompleto: '', dataDeNascimento: '', parentesco: '' });
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
            label="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <FieldSelect
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

          <TextField id="filled-basic" label="RG" variant="filled" />

          <div className='double-box'>
            <TextField id="filled-basic" label="Órgão Expedidor" variant="filled" />
            <FieldSelect
              label="UF"
              value={uf_orgao}
              onChange={handleChangeUfOrgao}
              options={ufList}
            />
          </div>

          <TextField id="filled-basic" label="CPF" variant="filled" />
          <DataSelect
            label="Data de Expedição"
            value={dataExpedicao}
            onChange={(newValue) => setDataExpedicao(newValue)}
          />

          <TextField className='formItem' id="filled-basic" label="Nome do Pai" variant="filled" />

          <TextField className='formItem' id="filled-basic" label="Nome da Mãe" variant="filled" />
        </div>

        <h3> Dados de Contato </h3>
        <div className="">

          <TextField className='formItem' id="filled-basic" label="E-mail" variant="filled" />

          <div className='double-box'>
            <TextField className='formItem' id="filled-basic" label="Celular" variant="filled" />

            <TextField className='formItem' id="filled-basic" label="Telefone" variant="filled" />
          </div>
        </div>

        <h3> Endereço </h3>
        <div className="section-form">
          <TextField className='formItem' id="filled-basic" label="CEP" variant="filled" />

          <TextField className='formItem' id="filled-basic" label="Cidade" variant="filled" />

          <FieldSelect
            label="UF"
            value={uf_endereco}
            onChange={handleChangeUfEndereco}
            options={ufList}
          />

          <TextField className='formItem' id="filled-basic" label="Logadouro" variant="filled" />

          <TextField className='formItem' id="filled-basic" label="Complemento" variant="filled" />
        </div>

        <h3> Dados de Contratação </h3>
        <div className="section-form">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cargo}
              label="Cargo"
              onChange={handleChange}
            >
              {cargoList.map((cargoList) => (
                <MenuItem
                  key={cargoList}
                  value={cargoList}
                >
                  {cargoList}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DataSelect
            label="Data de Contratação"
            value={dataContratacao}
            onChange={(newValue) => setDataContratacao(newValue)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Lotação</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lotação}
              label="Lotação"
              onChange={handleChange}
            >
              {lotaçãoList.map((lotaçãoList) => (
                <MenuItem
                  key={lotaçãoList}
                  value={lotaçãoList}
                >
                  {lotaçãoList}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField className='formItem' id="filled-basic" label="Órgão" variant="filled" />
          <TextField className='formItem' id="filled-basic" label="Posto de Trabalho " variant="filled" />
          <TextField className='formItem' id="filled-basic" label="Situação Atual" variant="filled" />

          <h3> Dependentes </h3>
          <buttons onClick={handleAddDependent}>Adicionar Dependente</buttons>
          {showDependentForm && (
            <div className="section-form">
              <TextField
                label="Nome Completo"
                value={currentDependent.nomeCompleto}
                onChange={(e) => handleDependentChange('nomeCompleto', e.target.value)}
              />
              <TextField
                label="Data de Nascimento"
                value={currentDependent.dataDeNascimento}
                onChange={(e) => handleDependentChange('dataDeNascimento', e.target.value)}
              />
              <TextField
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
    </section>
  );
};

export default MemberShip;