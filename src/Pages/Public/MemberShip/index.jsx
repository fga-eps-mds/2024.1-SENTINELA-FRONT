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
import { createMemberShip  } from '../../../Services/MemberShipService';
import PrimaryButton from "../../../Components/PrimaryButton";


const MemberShip = () => {
  console.log('MemberShip called');
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [uf_naturalidade, setUfNaturalidade] = useState('');
  const [uf_orgao , setUfOrgao] = useState('');
  const [uf_endereco, setUfEndereco] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [dataContratacao, setDataContratacao] = useState(null);
  const [dataDeNascimento, setdataDeNascimento] = useState(null);
  const [dataExpedicao, setDataExpedicao] = useState(null);
  const [cargo, setCargo] = useState('');
  const [lotação, setLotação] = useState('');
  const [matricula, setMatricula] = useState('');
  const [nomeCompleto, setnomeCompleto] = useState(''); 
  const [dataNasc, setDataNasc] = useState(null);
  const [naturalidade, setNaturalidade] = useState('');
  const [rg, setRg] = useState('');
  const [orgao, setOrgao] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeDaMae, setnomeDaMae] = useState('');
  const [nomeDoPai, setnomeDoPai] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');
  const [postoDeTrabalho, setpostoDeTrabalho] = useState('');
  const [orgaoExpeditor, setOrgaoExpeditor] = useState('');
  const [situacaoAtual, setSituacaoAtual] = useState('');
  

  

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
  const [currentDependent, setCurrentDependent] = useState({ nomeCompletoDependente: '', dataNasc: '', parentesco: '' , cpfDependente: '', celularDependente: ''});
  
 
  
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
    setCurrentDependent({ nomeCompletoDependente: '', dataNasc: '', parentesco: '',cpfDependente: '', celularDependente: '' });
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

  const handleSubmit = async () => {
    console.log('handleSubmit called');
    const formData = {
      email,
      sexo,
      estadoCivil,
      tipoSanguineo,
      uf_naturalidade,
      uf_orgao,
      uf_endereco,
      escolaridade,
      dataContratacao,
      dataDeNascimento,
      dataExpedicao,
      cargo,
      lotação,
      matricula,
      nomeCompleto,
      naturalidade,
      rg,
      orgao,
      cpf,
      nomeDaMae,
      nomeDoPai,
      cep,
      cidade,
      logradouro,
      complemento,
      telefone,
      celular,
      postoDeTrabalho,
      orgaoExpeditor,
      situacaoAtual,
      dependentes
    };
    createMemberShip(formData);
  
    
  }
  return (
    <section className="container">

      <div className="bar-container">
        <SideBar buttons={buttons} />
      </div>

      <div className='forms-container'>

        <h1>Formulário de Filiação</h1>

        <h3> Dados Pessoais </h3>

        <div className="section-form">
          <FieldText
            label="Nome Completo"
            value={nomeCompleto}
            onChange={(e) => setnomeCompleto(e.target.value)}
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
            value={dataDeNascimento}
            onChange={(newValue) => setdataDeNascimento(newValue)}
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
            value = {nomeDoPai}
            onChange={(e) => setnomeDoPai(e.target.value)}/>

          <FieldText
            label = "Nome da Mãe" 
            value = {nomeDaMae}
            onChange={(e) => setnomeDaMae(e.target.value)}/>  
        
        </div>

        <h3> Dados de Contato </h3>

        <FieldText
            label = "E-mail" 
            value = {email}
            onChange={(e) => setEmail(e.target.value)}/>

        <div className="section-form">
          <FieldText
            label = "Celular" 
            value = {celular}
            onChange={(e) => setCelular(e.target.value)}/>

          <FieldText
            label = "Telefone" 
            value = {telefone}
            onChange={(e) => setTelefone(e.target.value)}/>
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
            value = {postoDeTrabalho}
            onChange={(e) => setpostoDeTrabalho(e.target.value)}/>
          
            
          <FieldSelect
            label="Situação Atual"
            value={situacaoAtual}
            onChange={handleChangeSituacaoAtual}
            options={situacaoAtualList}
          />

        </div>
          <div> 
            <buttons id="addDependentBttn" onClick={handleAddDependent}><h3>Adicionar Dependente</h3></buttons>
            {showDependentForm && (
              <div>
                <div className='dependentToAdd'>
                  <div className="section-dependent-form">
                    <FieldText
                      label="Nome Completo"
                      value={currentDependent.nomeCompletoDependente}
                      onChange={(e) => handleDependentChange('nomeCompletoDependente', e.target.value)}
                    />

                    <DataSelect
                      label="Data de Nascimento"
                      value={dataNasc}
                      onChange={(newValue) => handleDependentChange('dataNasc',newValue.tagert.value)}
                    />

                    <FieldText
                      label="Parentesco"
                      value={currentDependent.parentesco}
                      onChange={(e) => handleDependentChange('parentesco', e.target.value)}
                    />

                    <FieldText
                      label="CPF"
                      value={currentDependent.cpfDependente}
                      onChange={(e) => handleDependentChange('cpfDependente', e.target.value)}
                    />

                    <FieldText
                      label="Celular"
                      value={currentDependent.celularDependente}
                      onChange={(e) => handleDependentChange('celularDependente', e.target.value)}
                    />        
                  </div>
                  <PrimaryButton text="Adicionar Dependente" onClick={handleSaveDependent} />
                </div>

                {dependentes.map((dependent, index) => (
                  <div>
                    <h3 id='dependentTitle'>Dependente {index+1}</h3>
                    <div className='dependentBox' key={index}>
                      <div className='section-dependent-form'>
                        <FieldText 
                          label="Nome Completo"
                          value={dependent.nomeCompletoDependente}
                        />
                        
                        <DataSelect 
                          label="Data de Nascimento"
                          
                        />

                        <FieldText 
                          label="Parentesco"
                          value={dependent.parentesco}
                        />

                        <FieldText 
                          label="CPF"
                          value={dependent.cpfDependente}
                        />

                        <FieldText 
                          label="Celular"
                          value={dependent.celularDependente}
                        />
                      </div>
                        <PrimaryButton text="Remover Dependente"
                                       onClick={() => handleRemoveDependent(index)}
                                       
                                       />
                    </div>
                  </div>
                  
                ))}
              </div>
            )}
          </div>
          <button onClick={() => handleSubmit()}>ENVIAR SOLICITAÇÃO</button>
      </div>
    </section>
  );
};

export default MemberShip;