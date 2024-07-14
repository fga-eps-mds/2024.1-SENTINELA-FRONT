import React, { useState } from 'react';
import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";





const MemberShip = () => {
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [uf, setUf] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  

  const handleChange = (event) => {
    setTipoSanguineo(event.target.value);
  };
  const tipoSanguineoList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const sexoList = ['Masculino', 'Feminino', 'Outro'];
  const ufList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  const estadoCivilList = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'União Estável'];
  const escolaridadeList = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-Graduação', 'Mestrado', 'Doutorado'];
  
  const buttons = [
    <SideButton key="login" text="Login" />,
    <SideButton key="filiacao" text="Filiação" />,
    <SideButton key="sobre" text="Sobre" />,
  ];

  return (
    <section className="container">
      <SideBar buttons={buttons} />
      <div>
        <h1>Formulário de Filiação</h1>
        <div className="section-form">
          <h3> Dados Pessoais </h3>
          <TextField id="filled-basic" label="Nome Completo" variant="filled" />
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
          <TextField id="filled-basic" label="Data de Nascimento" variant="filled" />
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
          <TextField id="filled-basic" label="Naturalidade" variant="filled" />
         
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
          <TextField id="filled-basic" label="CPF" variant="filled" />
          <TextField id="filled-basic" label="Data da Expedição" variant="filled" />
          
          <TextField id="filled-basic" label="Nome do Pai" variant="filled" />
          <TextField id="filled-basic" label="Nome da Mãe" variant="filled" />
        </div>
        <div className="section-form">
          <h3> Dados de Contato </h3>
          {/* Add your contact fields here */}
        </div>
        <div className="section-form">
          <h3> Endereço </h3>
          {/* Add your address fields here */}
        </div>
        <div className="section-form">
          <h3> Dados de Contratação </h3>
          {/* Add your hiring details fields here */}
        </div>
      </div>
    </section>
  );
};

export default MemberShip;
