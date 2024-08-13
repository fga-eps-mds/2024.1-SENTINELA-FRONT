import { useState } from "react";
import "./index.css";
import "../../../index.css";
import dayjs from "dayjs";
import FieldText from "../../../Components/FieldText";
import DataSelect from "../../../Components/DataSelect";
import FieldSelect from "../../../Components/FieldSelect";
import { createMemberShip } from "../../../Services/MemberShipService";
import PrimaryButton from "../../../Components/PrimaryButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import SecondaryButton from "../../../Components/SecondaryButton";
import Modal from "../../../Components/Modal";
import { useNavigate } from "react-router-dom";

const MemberShip = () => {
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [uf_naturalidade, setUfNaturalidade] = useState("");
  const [uf_orgao, setUfOrgao] = useState("");
  const [uf_endereco, setUfEndereco] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [dataContratacao, setDataContratacao] = useState(null);
  const [dataDeNascimento, setdataDeNascimento] = useState(null);
  const [dataExpedicao, setDataExpedicao] = useState(null);
  const [cargo, setCargo] = useState("");
  const [lotacao, setlotacao] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nomeCompleto, setnomeCompleto] = useState("");
  const [dataNasc] = useState(null);
  const [naturalidade, setNaturalidade] = useState("");
  const [rg, setRg] = useState("");
  const [orgao, setOrgao] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeDaMae, setnomeDaMae] = useState("");
  const [nomeDoPai, setnomeDoPai] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [postoDeTrabalho, setpostoDeTrabalho] = useState("");
  const [orgaoExpedidor, setOrgaoExpedidor] = useState("");
  //const [situacaoAtual, setSituacaoAtual] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [errorFields, setErrorFields] = useState(false);
  const [religiao, setReligiao] = useState("");
  const [missingList, setMissingList] = useState([]);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const navigate = useNavigate();
  // Function to validate a field
  const validateField = (fieldName, value) => {
    let error = "";
    if (!value.trim()) {
      // Checks if the field is empty or just whitespace
      error = "Campo obrigatório";
    }
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  // Handler for field changes

  // Handler for field blur event
  const handleBlur = (e, fieldName) => {
    const { value } = e.target;
    validateField(fieldName, value);
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  //listas dos selects
  const tipoSanguineoList = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const sexoList = ["Masculino", "Feminino"];
  const ufList = [
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
  const estadoCivilList = ["Solteiro", "Casado", "Separado", "Viúvo"];
  const escolaridadeList = [
    "Ensino Fundamental",
    "Ensino Médio",
    "Ensino Superior",
    "Pós-Graduação",
    "Mestrado",
    "Doutorado",
  ];

  const fieldNames = {
    email: "Email",
    sexo: "Sexo",
    estadoCivil: "Estado Civil",
    tipoSanguineo: "Tipo Sanguíneo",
    uf_naturalidade: "UF de Naturalidade",
    uf_orgao: "UF do Órgão",
    uf_endereco: "UF do Endereço",
    escolaridade: "Escolaridade",
    dataContratacao: "Data de Contratação",
    dataDeNascimento: "Data de Nascimento",
    dataExpedicao: "Data de Expedição",
    cargo: "Cargo",
    lotacao: "Lotação",
    matricula: "Matrícula",
    nomeCompleto: "Nome Completo",
    naturalidade: "Naturalidade",
    rg: "RG",
    orgao: "Órgão",
    cpf: "CPF",
    nomeDaMae: "Nome da Mãe",
    nomeDoPai: "Nome do Pai",
    cep: "CEP",
    cidade: "Cidade",
    logradouro: "Logradouro",
    complemento: "Complemento",
    telefone: "Telefone",
    celular: "Celular",
    postoDeTrabalho: "Posto de Trabalho",
    orgaoExpedidor: "Órgão Expedidor",
    religiao: "Religião",
  };

  //const situacaoAtualList = ["Ativo", "Inativo"];
  const [dependentes, setDependentes] = useState([]);
  const [showDependentForm, setShowDependentForm] = useState(false);
  const [currentDependent, setCurrentDependent] = useState({
    nomeCompletoDependente: "",
    dataNasc: "",
    parentesco: "",
    cpfDependente: "",
    celularDependente: "",
  });

  //máscaras
  const mascaraCPF = (cpf) => {
    let formattedCPF = cpf.replace(/\D/g, "");
    if (formattedCPF.length > 11) formattedCPF = formattedCPF.slice(0, 11);

    return formattedCPF
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const mascaraRg = (rg) => {
    let formattedRG = rg.replace(/\D/g, "");
    return formattedRG;
  };

  const mascaraTelefone = (telefone) => {
    let formattedTelefone = telefone.replace(/\D/g, "");
    if (formattedTelefone.length > 11) {
      formattedTelefone = formattedTelefone.slice(0, 11);
    }
    return formattedTelefone
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
  };

  const mascaraCEP = (cep) => {
    let formattedCEP = cep.replace(/\D/g, "");
    if (formattedCEP.length > 8) {
      formattedCEP = formattedCEP.slice(0, 8);
    }
    return formattedCEP.replace(/(\d{5})(\d)/, "$1-$2");
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
    if (
      !currentDependent.nomeCompletoDependente ||
      !currentDependent.dataNasc ||
      !currentDependent.parentesco ||
      !currentDependent.cpfDependente ||
      !currentDependent.celularDependente ||
      currentDependent.cpfDependente.length < 14 ||
      currentDependent.celularDependente.length < 15
    ) {
      setOpenError(true);
    } else {
      setDependentes([...dependentes, currentDependent]);
      setCurrentDependent({
        nomeCompletoDependente: "",
        dataNasc: "",
        parentesco: "",
        cpfDependente: "",
        celularDependente: "",
      });
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

  const erro = (campo) => {
    return touchedFields[campo] && errors[campo] ? (
      <span className="error-message">{errors[campo]}</span>
    ) : null;
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };
  const isValidEmail = (email) => {
    const allowedDomains = [
      "com",
      "net",
      "org",
      "com.br",
      "org.br",
      "edu",
      "gov",
    ];

    const domainPattern = allowedDomains
      .map((domain) => {
        const escapedDomain = domain.replace(/\./g, "\\.");
        return `(?:[a-zA-Z0-9.-]+\\.)?${escapedDomain}`;
      })
      .join("|");

    const emailRegex = new RegExp(
      `^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9.-]+\\.)?(${domainPattern})$`,
      "i"
    );

    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const erros = {};

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
    //if (!situacaoAtual) erros.situacaoAtual = 1;
    if (!religiao) erros.religiao = 1;
    if (isValidEmail(email) === false) erros.email = 1;
    if (cpf.length < 14) erros.cpf = 1;
    if (rg.length < 7) erros.rg = 1;
    if (cep.length < 9) erros.cep = 1;
    if (telefone.length < 14) erros.telefone = 1;
    if (celular.length < 15) erros.celular = 1;

    if (Object.keys(erros).length > 0) {
      setMissingList(Object.keys(erros));
      setOpenError(true);
    } else {
      setOpenSuccessDialog(true);
    }
  };

  const submitForm = async () => {
    const formData = {
      name: nomeCompleto,
      email,
      phone: celular,
      bloodType: tipoSanguineo,
      registration: matricula,
      birthDate: dataDeNascimento,
      sex: sexo,
      naturalness: naturalidade,
      uf_naturalidade,
      uf_orgao,
      uf_address: uf_endereco,
      marialStatus: estadoCivil,
      education: escolaridade,
      rg,
      orgao,
      cpf,
      hiringDate: dataContratacao,
      expeditionDate: dataExpedicao,
      position: cargo,
      lotacao,
      cep,
      motherName: nomeDaMae,
      fatherName: nomeDoPai,
      city: cidade,
      street: logradouro,
      complement: complemento,
      landline: telefone,
      workPlace: postoDeTrabalho,
      shipperOrganization: orgaoExpedidor,
      religion: religiao,
      dependents: dependentes,
    };

    const message = await createMemberShip(formData);
    if (message != 201) {
      setErrorFields(message);
      return; // Impede a navegação e mantém o usuário na página atual
    } else {
      // Se não houver mensagem de erro, navega para /home
      console.log(message);
      navigate("/");
    }
  };
  return (
    <section className="container">
      <div className="forms-container">
        <h1>Formulário de Filiação</h1>

        <h3> Dados Pessoais </h3>

        <FieldText
          label="Nome Completo *"
          value={nomeCompleto}
          onChange={(e) => setnomeCompleto(e.target.value)}
          onBlur={(e) => handleBlur(e, "nomeCompleto")}
          erro={erro("nomeCompleto")}
        />

        <div className="section-form">
          <FieldText
            label="Religião *"
            value={religiao}
            onChange={(e) => setReligiao(e.target.value)}
            onBlur={(e) => handleBlur(e, "religiao")}
            erro={erro("religiao")}
          />

          <FieldSelect
            label="Tipo Sanguíneo *"
            value={tipoSanguineo}
            onChange={handleChangeTipoSanguineo}
            options={tipoSanguineoList}
            onBlur={(e) => handleBlur(e, "tipoSanguineo")}
            erro={erro("tipoSanguineo")}
          />

          <FieldText
            label="Matrícula *"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            onBlur={(e) => handleBlur(e, "matricula")}
            erro={erro("matricula")}
          />

          <DataSelect
            label="Data de Nascimento *"
            value={dataDeNascimento}
            onChange={(newValue) => setdataDeNascimento(newValue)}
            onBlur={(e) => handleBlur(e, "dataDeNascimento")}
            erro={erro("dataDeNascimento")}
          />

          <FieldSelect
            label="Sexo *"
            value={sexo}
            onChange={handleChangeSexo}
            options={sexoList}
            onBlur={(e) => handleBlur(e, "sexo")}
            erro={erro("sexo")}
          />

          <div className="double-box" style={{ marginLeft: "0px" }}>
            <FieldText
              label="Naturalidade *"
              value={naturalidade}
              onChange={(e) => setNaturalidade(e.target.value)}
              onBlur={(e) => handleBlur(e, "naturalidade")}
              erro={erro("naturalidade")}
            />

            <FieldSelect
              label="UF *"
              value={uf_naturalidade}
              onChange={handleChangeUf}
              options={ufList}
              onBlur={(e) => handleBlur(e, "uf_naturalidade")}
              erro={erro("uf_naturalidade")}
            />
          </div>

          <FieldSelect
            label="Estado Civil *"
            value={estadoCivil}
            onChange={handleChangeEstadoCivil}
            options={estadoCivilList}
            onBlur={(e) => handleBlur(e, "estadoCivil")}
            erro={erro("estadoCivil")}
          />

          <FieldSelect
            label="Escolaridade *"
            value={escolaridade}
            onChange={handleChangeEscolaridade}
            options={escolaridadeList}
            onBlur={(e) => handleBlur(e, "escolaridade")}
            erro={erro("escolaridade")}
          />

          <FieldText
            label="RG *"
            value={rg}
            onChange={(e) => setRg(mascaraRg(e.target.value))}
            onBlur={(e) => handleBlur(e, "rg")}
            erro={erro("rg")}
          />

          <div className="double-box" style={{ marginLeft: "0px" }}>
            <FieldText
              label="Órgão Expeditor *"
              value={orgaoExpedidor}
              onChange={(e) => setOrgaoExpedidor(e.target.value)}
              onBlur={(e) => handleBlur(e, "orgaoExpedidor")}
              erro={erro("orgaoExpedidor")}
            />

            <FieldSelect
              label="UF *"
              value={uf_orgao}
              onChange={handleChangeUfOrgao}
              options={ufList}
              onBlur={(e) => handleBlur(e, "uf_orgao")}
              erro={erro("uf_orgao")}
            />
          </div>

          <FieldText
            label="CPF *"
            value={cpf}
            onChange={(e) => setCpf(mascaraCPF(e.target.value))}
            onBlur={(e) => handleBlur(e, "cpf")}
            erro={erro("cpf")}
          />

          <DataSelect
            label="Data de Expedição *"
            value={dataExpedicao}
            onChange={(newValue) => setDataExpedicao(newValue)}
            onBlur={(e) => handleBlur(e, "dataExpedicao")}
            erro={erro("dataExpedicao")}
          />

          <FieldText
            label="Nome do Pai *"
            value={nomeDoPai}
            onChange={(e) => setnomeDoPai(e.target.value)}
            onBlur={(e) => handleBlur(e, "nomeDoPai")}
            erro={erro("nomeDoPai")}
          />

          <FieldText
            label="Nome da Mãe *"
            value={nomeDaMae}
            onChange={(e) => setnomeDaMae(e.target.value)}
            onBlur={(e) => handleBlur(e, "nomeDaMae")}
            erro={erro("nomeDaMae")}
          />
        </div>

        <h3> Dados de Contato </h3>

        <FieldText
          label="E-mail *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => handleBlur(e, "email")}
          erro={erro("email")}
        />

        <div className="section-form">
          <FieldText
            label="Celular *"
            value={celular}
            onChange={(e) => setCelular(mascaraTelefone(e.target.value))}
            onBlur={(e) => handleBlur(e, "celular")}
            erro={erro("celular")}
          />

          <FieldText
            label="Telefone *"
            value={telefone}
            onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
            onBlur={(e) => handleBlur(e, "telefone")}
            erro={erro("telefone")}
          />
        </div>

        <h3> Endereço </h3>
        <div className="section-form">
          <FieldText
            label="CEP *"
            value={cep}
            onChange={(e) => setCep(mascaraCEP(e.target.value))}
            onBlur={(e) => handleBlur(e, "cep")}
            erro={erro("cep")}
          />
          <div className="double-box" style={{ marginLeft: "0px" }}>
            <FieldText
              label="Cidade *"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              onBlur={(e) => handleBlur(e, "cidade")}
              erro={erro("cidade")}
            />

            <FieldSelect
              label="UF *"
              value={uf_endereco}
              onChange={handleChangeUfEndereco}
              options={ufList}
              onBlur={(e) => handleBlur(e, "uf_endereco")}
              erro={erro("uf_endereco")}
            />
          </div>

          <FieldText
            label="Logradouro *"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            onBlur={(e) => handleBlur(e, "logradouro")}
            erro={erro("logradouro")}
          />

          <FieldText
            label="Complemento *"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            onBlur={(e) => handleBlur(e, "complemento")}
            erro={erro("complemento")}
          />
        </div>

        <h3> Dados de Contratação </h3>
        <div className="section-form">
          <FieldText
            label="Cargo *"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            onBlur={(e) => handleBlur(e, "cargo")}
            erro={erro("cargo")}
          />

          <DataSelect
            label="Data de Contratação *"
            value={dataContratacao}
            onChange={(newValue) => setDataContratacao(newValue)}
            onBlur={(e) => handleBlur(e, "dataContratacao")}
            erro={erro("dataContratacao")}
          />
          <FieldText
            label="Lotação *"
            value={lotacao}
            onChange={(e) => setlotacao(e.target.value)}
            onBlur={(e) => handleBlur(e, "lotacao")}
            erro={erro("lotacao")}
          />

          <FieldText
            label="Órgão *"
            value={orgao}
            onChange={(e) => setOrgao(e.target.value)}
            onBlur={(e) => handleBlur(e, "orgao")}
            erro={erro("orgao")}
          />
          <FieldText
            label="Posto de Trabalho *"
            value={postoDeTrabalho}
            onChange={(e) => setpostoDeTrabalho(e.target.value)}
            onBlur={(e) => handleBlur(e, "postoDeTrabalho")}
            erro={erro("postoDeTrabalho")}
          />
        </div>
        <div>
          <div>
            <h3>
              Adicionar Dependente{" "}
              <AddCircleOutlineIcon
                id="addDependentBttn"
                onClick={handleAddDependent}
              />
            </h3>
          </div>
          {showDependentForm && (
            <div>
              <div className="dependentToAdd">
                <div className="section-dependent-form">
                  <FieldText
                    label="Nome Completo *"
                    value={currentDependent.nomeCompletoDependente}
                    onChange={(e) =>
                      handleDependentChange(
                        "nomeCompletoDependente",
                        e.target.value
                      )
                    }
                  />

                  <DataSelect
                    label="Data de Nascimento *"
                    value={dataNasc}
                    onChange={(newDate) =>
                      handleDependentChange("dataNasc", newDate)
                    }
                  />

                  <FieldText
                    label="Parentesco *"
                    value={currentDependent.parentesco}
                    onChange={(e) =>
                      handleDependentChange("parentesco", e.target.value)
                    }
                  />

                  <FieldText
                    label="CPF *"
                    value={currentDependent.cpfDependente}
                    onChange={(e) =>
                      handleDependentChange(
                        "cpfDependente",
                        mascaraCPF(e.target.value)
                      )
                    }
                  />

                  <FieldText
                    label="Celular *"
                    value={currentDependent.celularDependente}
                    onChange={(e) =>
                      handleDependentChange(
                        "celularDependente",
                        mascaraTelefone(e.target.value)
                      )
                    }
                  />
                </div>
                <PrimaryButton
                  text="Confirmar Dependente"
                  onClick={handleSaveDependent}
                />
              </div>

              {dependentes.map((dependent, index) => (
                <div key={index}>
                  <h3 id="dependentTitle">Dependente {index + 1}</h3>
                  <div
                    className="dependentBox"
                    key={index}
                    style={{ marginBottom: "50px" }}
                  >
                    <div className="section-dependent-form">
                      <FieldText
                        label="Nome Completo"
                        value={dependent.nomeCompletoDependente}
                      />
                      <FieldText
                        label="Data de Nascimento"
                        value={dayjs(dependent.dataNasc).format("DD/MM/YYYY")}
                      />

                      <FieldText
                        label="Parentesco"
                        value={dependent.parentesco}
                      />

                      <FieldText label="CPF" value={dependent.cpfDependente} />

                      <FieldText
                        label="Celular"
                        value={dependent.celularDependente}
                      />
                    </div>
                    <PrimaryButton
                      text="Remover Dependente"
                      onClick={() => handleRemoveDependent(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div id="enviar">
          <PrimaryButton
            text="ENVIAR SOLICITAÇÃO"
            onClick={() => handleSubmit()}
          />
        </div>

        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={() => setOpenError(false)}
        >
          <Alert onClose={() => setOpenError(false)} severity="error">
            {missingList.length <= 5
              ? `Os seguintes campos estão faltando: ${missingList.map((key) => fieldNames[key]).join(", ")}`
              : "Certifique-se de que todos os campos estão preenchidos"}
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorFields}
          autoHideDuration={6000}
          onClose={() => setErrorFields(false)}
        >
          <Alert onClose={() => setErrorFields(false)} severity="error">
            {errorFields}
          </Alert>
        </Snackbar>

        <Modal
          show={openSuccessDialog}
          width="608px"
          alertTitle="Ao confirmar essa solicitação, você estará concordando com a declaração a seguir:"
          alert="Declaro que, ao filiar-me nesta data ao SINDPOL-DF, concordo e ratifico com todas as minhas obrigações previstas no Estatuto Social, regime interno e deliberação das assembleias gerais do Sindicato dos Policiais Penais do Distrito Federal. Ao tempo que comprometo-me em contribuir mensalmente com o valor de 1,5% vencimento básico, conforme Art. 105 do Estatuto APROVADO pela assembleia geral, o qual AUTORIZO que consignado em folha de pagamento junto ao órgão competente em favor do SINDPOL-DF, bem como outras contribuições de caráter extraordinário - desde que aprovadas em assembleia específica - Reconheço ainda que tais contribuições têm o condão de manter a entidade de representação sindical forte e independente no intuito de garantir melhores condições de trabalho para toda a categoria. Fico ciente que, ao desejar afastar-me do quadro social do sindicato, devo manifestar-me por escrito, em formulário específico, com antecedência de 60 (sessenta) dias. Pela presente, solicito minha admissão no quadro de filiados do SINDICATO DOS POLICIAIS PENAIS DO DISTRITO FEDERAL."
        >
          {" "}
          <SecondaryButton
            text="cancelar"
            onClick={() => handleCloseSuccessDialog()}
            width="608px"
          />
          <PrimaryButton
            text="solicitar filiação ao sindpol-df"
            onClick={submitForm}
            width="608px"
          />
        </Modal>
        <footer style={{ height: "100px" }} />
      </div>
    </section>
  );
};

export default MemberShip;
