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
    
  //listas dos selects
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
  
  //máscaras
  const mascaraCPF = (cpf) => {
    return cpf
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os três primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os seis primeiros dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona traço após os nove primeiros dígitos
  };
  
  const mascaraTelefone = (telefone) => {
    return telefone
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses ao redor do código de área
      .replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona traço após os cinco primeiros dígitos do telefone
  };
  
  
  

  //eventos
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
      alert("Certifique-se de que todos os campos estão preenchidos");
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
    
    const erros = {}

    if (!email) erros.email = 1;
    if (!sexo) erros.sexo = 1;
    if (!estadoCivil) erros.estadoCivil = 1;
    if (!tipoSanguineo) erros.tipoSanguineo = 1;
    if (!uf_naturalidade) erros.uf_naturalidade = 1;
    if (!uf_orgao) erros.uf_orgao = 1;
    if (!uf_endereco) erros.uf_endereco = 1;
    if (!escolaridade) erros.escolaridade = 1;
    if (!dataContratacao) erros.dataContratacao = 1;
    if (!dataDeNascimento) erros.dataDeNascimento = 1;
    if (!dataExpedicao) erros.dataExpedicao = 1;
    if (!cargo) erros.cargo = 1;
    if (!lotacao) erros.lotacao = 1;
    if (!matricula) erros.matricula = 1;
    if (!nomeCompleto) erros.nomeCompleto = 1;
    if (!naturalidade) erros.naturalidade = 1;
    if (!rg) erros.rg = 1;
    if (!orgao) erros.orgao = 1;
    if (!cpf) erros.cpf = 1;
    if (!nomeDaMae) erros.nomeDaMae = 1;
    if (!nomeDoPai) erros.nomeDoPai = 1;
    if (!cep) erros.cep = 1;
    if (!cidade) erros.cidade = 1;
    if (!logradouro) erros.logradouro = 1;
    if (!complemento) erros.complemento = 1;
    if (!telefone) erros.telefone = 1;
    if (!celular) erros.celular = 1;
    if (!postoDeTrabalho) erros.postoDeTrabalho = 1;
    if (!orgaoExpedidor) erros.orgaoExpedidor = 1;
    if (!situacaoAtual) erros.situacaoAtual = 1;
    
    (Object.keys(erros).length > 0 ? alert("Certifique-se de que todos os campos estão preenchidos") : createMemberShip(formData));
    console.log(JSON.stringify(formData))
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
            onChange={(e) => setCpf(mascaraCPF(e.target.value))}
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
            onChange={(e) => setCelular(mascaraTelefone(e.target.value))}/>

          <FieldText
            label = "Telefone" 
            value = {telefone}
            onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}/>
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
                      onChange={(e) => handleDependentChange('cpfDependente', mascaraCPF(e.target.value))}
                    />

                    <FieldText
                      label="Celular"
                      value={currentDependent.celularDependente}
                      onChange={(e) => handleDependentChange('celularDependente', mascaraTelefone(e.target.value))}
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