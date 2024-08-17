import { useEffect, useState } from "react";
import "./index.css";
// import dayjs from "dayjs";
import FieldText from "../../../../Components/FieldText";
import DataSelect from "../../../../Components/DataSelect";
import FieldSelect from "../../../../Components/FieldSelect";
import PrimaryButton from "../../../../Components/PrimaryButton";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
// import SecondaryButton from "../../../../Components/SecondaryButton";
import { useLocation } from "react-router-dom";
import { getMemberShipById } from "../../../../Services/memberShipService";

const ViewMembershipPage = () => {
  const { state } = useLocation();
  const membershipId = state?.membershipId;
  //   const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [openError, setOpenError] = useState(false);
  const [missingList, setMissingList] = useState([]);
  const [unfilledDependent, setUnfilledDependent] = useState(false);
  const [errorFields, setErrorFields] = useState(false);

  setMissingList(false);
  setUnfilledDependent(false);
  setStatus(false);

  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [ufNaturalness, setUfNaturalness] = useState("");
  const [ufOrganization, setUfOrganization] = useState("");
  const [ufAddress, setUfAddress] = useState("");
  const [education, setEducation] = useState("");
  const [hiringDate, setHiringDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [expeditionDate, setExpeditionDate] = useState(null);
  const [position, setPosition] = useState("");
  const [lotacao, setLotacao] = useState("");
  const [registration, setRegistration] = useState("");
  const [name, setName] = useState("");
  const [naturalness, setNaturalness] = useState("");
  const [rg, setRg] = useState("");
  const [organization, setOrganization] = useState("");
  const [cpf, setCpf] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [phone, setPhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [shipperOrganization, setShipperOrganization] = useState("");
  const [status, setStatus] = useState(false);
  const [religion, setReligion] = useState("");
  const [dependents, setDependents] = useState([]);

  console.log(status);

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

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await getMemberShipById(membershipId);

        if (response) {
          setEmail(response?.email || "");
          setSex(response?.sex || "");
          setMaritalStatus(response?.marialStatus || "");
          setBloodType(response?.bloodType || "");
          setUfNaturalness(response?.uf_naturalidade || "");
          setUfOrganization(response?.uf_orgao || "");
          setUfAddress(response?.uf_address || "");
          setEducation(response?.education || "");
          setHiringDate(response?.hiringDate || null);
          setBirthDate(response?.birthDate || null);
          setExpeditionDate(response?.expeditionDate || null);
          setPosition(response?.position || "");
          setLotacao(response?.lotacao || "");
          setRegistration(response?.registration || "");
          setName(response?.name || "");
          setNaturalness(response?.naturalness || "");
          setRg(response?.rg || "");
          setOrganization(response?.orgao || "");
          setCpf(response?.cpf || "");
          setMotherName(response?.motherName || "");
          setFatherName(response?.fatherName || "");
          setCep(response?.cep || "");
          setCity(response?.city || "");
          setStreet(response?.street || "");
          setComplement(response?.complement || "");
          setPhone(response?.phone || "");
          setCellPhone(response?.cellPhone || "");
          setWorkPlace(response?.workPlace || "");
          setShipperOrganization(response?.shipperOrganization || "");
          setStatus(response?.status || "");
          setReligion(response?.religion || "");
          setDependents(response?.dependents || "");
        }
      } catch (err) {
        console.error("Error loading membership information.");
      }
    };

    fetchMembership();
  }, [membershipId]);

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

  const validateField = (fieldName, value) => {
    let error = "";
    if (!value.trim()) {
      // Checks if the field is empty or just whitespace
      error = "Campo obrigatório";
    }
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  // Handler for field blur event
  const handleBlur = (e, fieldName) => {
    const { value } = e.target;
    validateField(fieldName, value);
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const erro = (campo) => {
    return touchedFields[campo] && errors[campo] ? (
      <span className="error-message">{errors[campo]}</span>
    ) : null;
  };

  return !name ? null : (
    <section className="container">
      <div className="forms-container">
        <h1>Formulário de Filiação</h1>

        <h3> Dados Pessoais </h3>

        <FieldText
          label="Nome Completo *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => handleBlur(e, "nomeCompleto")}
          erro={erro("nomeCompleto")}
        />

        <div className="section-form">
          <FieldText
            label="Religião *"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            onBlur={(e) => handleBlur(e, "religiao")}
            erro={erro("religiao")}
          />

          <FieldSelect
            label="Tipo Sanguíneo *"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            options={tipoSanguineoList}
            onBlur={(e) => handleBlur(e, "tipoSanguineo")}
            erro={erro("tipoSanguineo")}
          />

          <FieldText
            label="Matrícula *"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            onBlur={(e) => handleBlur(e, "matricula")}
            erro={erro("matricula")}
          />

          <DataSelect
            label="Data de Nascimento *"
            value={birthDate}
            onChange={(newValue) => setBirthDate(newValue)}
            onBlur={(e) => handleBlur(e, "dataDeNascimento")}
            erro={erro("dataDeNascimento")}
          />

          <FieldSelect
            label="Sexo *"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            options={sexoList}
            onBlur={(e) => handleBlur(e, "sexo")}
            erro={erro("sexo")}
          />

          <div className="double-box" style={{ marginLeft: "0px" }}>
            <FieldText
              label="Naturalidade *"
              value={naturalness}
              onChange={(e) => setNaturalness(e.target.value)}
              onBlur={(e) => handleBlur(e, "naturalidade")}
              erro={erro("naturalidade")}
            />

            <FieldSelect
              label="UF *"
              value={ufNaturalness}
              onChange={(e) => setUfNaturalness(e.target.value)}
              options={ufList}
              onBlur={(e) => handleBlur(e, "uf_naturalidade")}
              erro={erro("uf_naturalidade")}
            />
          </div>

          <FieldSelect
            label="Estado Civil *"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            options={estadoCivilList}
            onBlur={(e) => handleBlur(e, "estadoCivil")}
            erro={erro("estadoCivil")}
          />

          <FieldSelect
            label="Escolaridade *"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
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
              value={shipperOrganization}
              onChange={(e) => setShipperOrganization(e.target.value)}
              onBlur={(e) => handleBlur(e, "orgaoExpedidor")}
              erro={erro("orgaoExpedidor")}
            />

            <FieldSelect
              label="UF *"
              value={ufOrganization}
              onChange={(e) => setUfOrganization(e.target.value)}
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
            value={expeditionDate}
            onChange={(newValue) => setExpeditionDate(newValue)}
            onBlur={(e) => handleBlur(e, "dataExpedicao")}
            erro={erro("dataExpedicao")}
          />

          <FieldText
            label="Nome do Pai *"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            onBlur={(e) => handleBlur(e, "nomeDoPai")}
            erro={erro("nomeDoPai")}
          />

          <FieldText
            label="Nome da Mãe *"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
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
            value={cellPhone}
            onChange={(e) => setCellPhone(mascaraTelefone(e.target.value))}
            onBlur={(e) => handleBlur(e, "celular")}
            erro={erro("celular")}
          />

          <FieldText
            label="Telefone *"
            value={phone}
            onChange={(e) => setPhone(mascaraTelefone(e.target.value))}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={(e) => handleBlur(e, "cidade")}
              erro={erro("cidade")}
            />

            <FieldSelect
              label="UF *"
              value={ufAddress}
              onChange={(e) => setUfAddress(e.target.value)}
              options={ufList}
              onBlur={(e) => handleBlur(e, "uf_endereco")}
              erro={erro("uf_endereco")}
            />
          </div>

          <FieldText
            label="Logradouro *"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            onBlur={(e) => handleBlur(e, "logradouro")}
            erro={erro("logradouro")}
          />

          <FieldText
            label="Complemento *"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            onBlur={(e) => handleBlur(e, "complemento")}
            erro={erro("complemento")}
          />
        </div>

        <h3> Dados de Contratação </h3>
        <div className="section-form">
          <FieldText
            label="Cargo *"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            onBlur={(e) => handleBlur(e, "cargo")}
            erro={erro("cargo")}
          />

          <DataSelect
            label="Data de Contratação *"
            value={hiringDate}
            onChange={(newValue) => setHiringDate(newValue)}
            onBlur={(e) => handleBlur(e, "dataContratacao")}
            erro={erro("dataContratacao")}
          />
          <FieldText
            label="Lotação *"
            value={lotacao}
            onChange={(e) => setLotacao(e.target.value)}
            onBlur={(e) => handleBlur(e, "lotacao")}
            erro={erro("lotacao")}
          />

          <FieldText
            label="Órgão *"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            onBlur={(e) => handleBlur(e, "orgao")}
            erro={erro("orgao")}
          />
          <FieldText
            label="Posto de Trabalho *"
            value={workPlace}
            onChange={(e) => setWorkPlace(e.target.value)}
            onBlur={(e) => handleBlur(e, "postoDeTrabalho")}
            erro={erro("postoDeTrabalho")}
          />
        </div>
        <div>
          <div>
            <div>
              {dependents.map((dependent, index) => (
                <div key={index}>
                  <h3 id="dependentTitle">Dependente {index + 1}</h3>
                  <div
                    className="dependentBox"
                    key={index}
                    style={{ marginBottom: "50px" }}
                  >
                    <div className="section-dependent-form"></div>
                    <PrimaryButton
                      text="Remover Dependente"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={() => setOpenError(false)}
          >
            <Alert onClose={() => setOpenError(false)} severity="error">
              {missingList.length <= 5 && missingList.length != 0
                ? `Os seguintes campos estão faltando: ${missingList.map((key) => fieldNames[key]).join(", ")}`
                : "Certifique-se de que todos os campos estão preenchidos"}
              {unfilledDependent && (
                <>
                  <br />
                  Existem campos de dependentes não preenchidos
                </>
              )}
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
          <footer style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default ViewMembershipPage;
