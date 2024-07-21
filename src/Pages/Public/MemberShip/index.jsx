import React, { useState } from 'react';
import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import 'dayjs/locale/pt-br'; // Importa a localização desejada para o dayjs
import FieldText from "../../../Components/FieldText"
import DataSelect from "../../../Components/DataSelect"
import FieldSelect from "../../../Components/FieldSelect"
import { createMemberShip  } from '../../../Services/MemberShipService';
import PrimaryButton from "../../../Components/PrimaryButton";
import BasicDateField from '../../../Components/DateField';
import dayjs from 'dayjs';


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
  const [lotacao, setlotacao] = useState('');
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
  const [orgaoExpedidor, setOrgaoExpedidor] = useState('');
  const [situacaoAtual, setSituacaoAtual] = useState('');
  

  

  const tipoSanguineoList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const sexoList = ['Masculino', 'Feminino', 'Outro'];
  const ufList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  const estadoCivilList = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'União Estável'];
  const escolaridadeList = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-Graduação', 'Mestrado', 'Doutorado'];
  const cargoList = ['Advogado', 'Agente', 'Outro'];
  const lotacaoList = ['Sede', 'Out', 'Outro'];
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
    if ((!currentDependent.nomeCompletoDependente) || (!currentDependent.dataNasc) || (!currentDependent.parentesco) || (!currentDependent.cpfDependente) || (!currentDependent.celularDependente)) {
      alert("DEU PAU");
    }

    else{
      setDependentes([...dependentes, currentDependent]);
      setCurrentDependent({ nomeCompletoDependente: '', dataNasc: '', parentesco: '',cpfDependente: '', celularDependente: '' });
      setShowDependentForm(true);
    }
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
    const erros = {}

    if (!email) erros.email = 'Campo de e-mail sem preenchimento';
    if (!sexo) erros.sexo = 'Campo de sexo sem preenchimento';
    if (!estadoCivil) erros.estadoCivil = 'Campo de estado civil sem preenchimento';
    if (!tipoSanguineo) erros.tipoSanguineo = 'Campo de tipo sanguíneo sem preenchimento';
    if (!uf_naturalidade) erros.uf_naturalidade = 'Campo de UF de naturalidade sem preenchimento';
    if (!uf_orgao) erros.uf_orgao = 'Campo de UF do órgão sem preenchimento';
    if (!uf_endereco) erros.uf_endereco = 'Campo de UF do endereço sem preenchimento';
    if (!escolaridade) erros.escolaridade = 'Campo de escolaridade sem preenchimento';
    if (!dataContratacao) erros.dataContratacao = 'Campo de data de contratação sem preenchimento';
    if (!dataDeNascimento) erros.dataDeNascimento = 'Campo de data de nascimento sem preenchimento';
    if (!dataExpedicao) erros.dataExpedicao = 'Campo de data de expedição sem preenchimento';
    if (!cargo) erros.cargo = 'Campo de cargo sem preenchimento';
    if (!lotacao) erros.lotacao = 'Campo de lotação sem preenchimento';
    if (!matricula) erros.matricula = 'Campo de matrícula sem preenchimento';
    if (!nomeCompleto) erros.nomeCompleto = 'Campo de nome completo sem preenchimento';
    if (!naturalidade) erros.naturalidade = 'Campo de naturalidade sem preenchimento';
    if (!rg) erros.rg = 'Campo de RG sem preenchimento';
    if (!orgao) erros.orgao = 'Campo de órgão sem preenchimento';
    if (!cpf) erros.cpf = 'Campo de CPF sem preenchimento';
    if (!nomeDaMae) erros.nomeDaMae = 'Campo de nome da mãe sem preenchimento';
    if (!nomeDoPai) erros.nomeDoPai = 'Campo de nome do pai sem preenchimento';
    if (!cep) erros.cep = 'Campo de CEP sem preenchimento';
    if (!cidade) erros.cidade = 'Campo de cidade sem preenchimento';
    if (!logradouro) erros.logradouro = 'Campo de logradouro sem preenchimento';
    if (!complemento) erros.complemento = 'Campo de complemento sem preenchimento';
    if (!telefone) erros.telefone = 'Campo de telefone sem preenchimento';
    if (!celular) erros.celular = 'Campo de celular sem preenchimento';
    if (!postoDeTrabalho) erros.postoDeTrabalho = 'Campo de posto de trabalho sem preenchimento';
    if (!orgaoExpedidor) erros.orgaoExpedidor = 'Campo de órgão expedidor sem preenchimento';
    if (!situacaoAtual) erros.situacaoAtual = 'Campo de situação atual sem preenchimento';
    
    console.log(Object.keys(erros).length);

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
      lotacao,
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
      orgaoExpedidor,
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
              value = {orgaoExpedidor} 
              onChange={(e) => setOrgaoExpedidor(e.target.value)}/>

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
            value={lotacao}
            onChange={(e) => setlotacao(e.target.value)}
            options={lotacaoList}
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
                  onChange={(newDate) => handleDependentChange('dataNasc', newDate)}
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
                        
                        <p>'data de aniversário': {dayjs(dependent.dataNasc).format('YYYY-MM-DD')}</p>

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