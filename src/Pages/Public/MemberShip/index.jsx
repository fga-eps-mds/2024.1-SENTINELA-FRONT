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


const MemberShip = () => {
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [uf, setUf] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [dataContratacao, setDataContratacao] = useState(null);
  const [dataNascimento, setDataNascimento] = useState(null);
  const [dataExpedicao, setDataExpedicao] = useState(null);
  const [cargo, setCargo] = useState('');
  const [lotação, setLotação] = useState('');
  
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState(null);

  const handleChange = (event) => {
    setTipoSanguineo(event.target.value);
  };
  const tipoSanguineoList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const sexoList = ['Masculino', 'Feminino', 'Outro'];
  const ufList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  const estadoCivilList = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'União Estável'];
  const escolaridadeList = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-Graduação', 'Mestrado', 'Doutorado'];
  const cargoList = ['Advogado','Agente', 'Outro'];
  const lotaçãoList = ['Sede', 'Out', 'Outro'];
  
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

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo Sanguíneo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tipoSanguineo}
              label="Tipo Sanguíneo"
              onChange={handleChange}
            >
              {tipoSanguineoList.map((tipoSanguineoList) => (
            <MenuItem
              key={tipoSanguineoList}
              value={tipoSanguineoList}
            >
              {tipoSanguineoList}
            </MenuItem>
          ))}
            </Select>
          </FormControl>

          <TextField id="filled-basic" label="Matrícula" variant="filled" />

          <DataSelect 
            label="Data de Nascimento"
            value={dataNasc}
            onChange={(newValue) => setDataNasc(newValue)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data de Nascimento"
              value={dataNascimento}
              onChange={(newValue) => setDataNascimento(newValue)}
              format="DD/MM/YYYY" // Define o formato desejado
              renderInput={(params) => <TextField {...params} variant="filled" />}
            />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sexo}
                label="Sexo"
                onChange={handleChange}
              >
                {sexoList.map((sexoList) => (
              <MenuItem
                key={sexoList}
                value={sexoList}
              >
                {sexoList}
              </MenuItem>
            ))}
              </Select>
          </FormControl>

          <div className='double-box'>
            <TextField className='formItem' id="filled-basic" label="Naturalidade" variant="filled" />
          
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">UF</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipoSanguineo}
                label="UF"
                onChange={handleChange}
              >
                {ufList.map((ufList) => (
              <MenuItem
                key={ufList}
                value={ufList}
              >
                {ufList}
              </MenuItem>
            ))}
              </Select>
            </FormControl>
          </div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estado Civil</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={estadoCivil}
              label="Estado Civil"
              onChange={handleChange}
            >
              {estadoCivilList.map((estadoCivil) => (
            <MenuItem
              key={estadoCivil}
              value={estadoCivil}
            >
              {estadoCivil}
            </MenuItem>
          ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Escolidade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={escolaridade}
              label="Escolidade"
              onChange={handleChange}
            >
              {escolaridadeList.map((escolaridade) => (
            <MenuItem
              key={escolaridade}
              value={escolaridade}
            >
              {escolaridade}
            </MenuItem>
          ))}
            </Select>
          </FormControl>

          <TextField id="filled-basic" label="RG" variant="filled" />

          <div className='double-box'>
            <TextField id="filled-basic" label="Órgão Expedidor" variant="filled" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">UF</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipoSanguineo}
                label="UF"
                onChange={handleChange}
              >
                {ufList.map((ufList) => (
              <MenuItem
                key={ufList}
                value={ufList}
              >
                {ufList}
              </MenuItem>
            ))}
                
              </Select>
            </FormControl>
          </div>

          <TextField id="filled-basic" label="CPF" variant="filled" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data de Expedição"
              value={dataExpedicao}
              onChange={(newValue) => setDataExpedicao(newValue)}
              format="DD/MM/YYYY"
              renderInput={(params) => <TextField {...params} variant="filled" />}
            />
          </LocalizationProvider>
          
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

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">UF</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tipoSanguineo}
                  label="UF"
                  onChange={handleChange}
                >
                  {ufList.map((ufList) => (
                <MenuItem
                  key={ufList}
                  value={ufList}
                >
                  {ufList}
                </MenuItem>
              ))}
                </Select>
              </FormControl>

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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data de Contratação"
              value={dataContratacao}
              onChange={(newValue) => setDataContratacao(newValue)}
              renderInput={(params) => <TextField {...params} variant="filled" />}
            />
            </LocalizationProvider>
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
        </div>
      </div>
    </section>
  );
};

export default MemberShip;