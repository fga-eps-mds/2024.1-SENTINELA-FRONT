import { useEffect, useState } from "react";
import "./index.css";
import "../../../../index.css";
import dayjs from "dayjs";
import FieldText from "../../../../Components/FieldText";
import DataSelect from "../../../../Components/DataSelect";
import FieldSelect from "../../../../Components/FieldSelect";
import PrimaryButton from "../../../../Components/PrimaryButton";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../../Components/Modal";
import {
  deleteMember,
  getMemberShipById,
  updateMembership,
} from "../../../../Services/memberShipService";
import {
  tipoSanguineoList,
  sexoList,
  ufList,
  estadoCivilList,
  escolaridadeList,
} from "../../../../Utils/constants";
// import { mascaraCPF, mascaraRg, mascaraTelefone, mascaraCEP, validateField } from "../../../../Utils/mask";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SecondaryButton from "../../../../Components/SecondaryButton";

const ViewMembershipPage = () => {
  const { state } = useLocation();
  const membershipId = state?.membershipId;
  const navigate = useNavigate();

  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [openError, setOpenError] = useState(false);
  const [openErrorMember, setOpenErrorMember] = useState(false);
  const [showDependentForm, setShowDependentForm] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  // Campos de filiado
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
  const [landline, setLandline] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [shipperOrganization, setShipperOrganization] = useState("");
  const [religion, setReligion] = useState("");
  const [dependents, setDependents] = useState([]);

  // campos Dependente:
  const [currentDependent, setCurrentDependent] = useState({
    nomeCompletoDependente: "",
    dataNasc: "",
    parentesco: "",
    cpfDependente: "",
    celularDependente: "",
  });

  // fetch dados do usuário
  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await getMemberShipById(membershipId);
        if (response) {
          setEmail(response?.email || "");
          setSex(response?.sex || "");
          setMaritalStatus(response?.maritalStatus || ""); // Corrigido para maritalStatus
          setBloodType(response?.bloodType || "");
          setUfNaturalness(response?.uf_naturalidade || "");
          setUfOrganization(response?.uf_orgao || "");
          setUfAddress(response?.uf_address || "");
          setEducation(response?.education || "");
          setHiringDate(
            response?.hiringDate ? dayjs(response?.hiringDate) : null
          );
          setBirthDate(response?.birthDate ? dayjs(response?.birthDate) : null);
          setExpeditionDate(
            response?.expeditionDate ? dayjs(response?.expeditionDate) : null
          );
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
          setLandline(response?.landline || "");
          setWorkPlace(response?.workPlace || "");
          setShipperOrganization(response?.shipperOrganization || "");
          setReligion(response?.religion || "");
          setDependents(response?.dependents || []);
        }
      } catch (err) {
        console.error("Error loading membership information:", err);
      }
    };

    if (membershipId) {
      fetchMembership();
    }
  }, [membershipId]);

  // adicionar dependente
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
      setDependents([...dependents, currentDependent]);
      setCurrentDependent({
        name: "",
        birthDate: "",
        relationship: "",
        cpfDependente: "",
        celularDependente: "",
      });
      setShowDependentForm(true);
    }
  };

  const handleDependentChange = (field, value) => {
    setCurrentDependent((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveDependent = (index) => {
    const newDependentes = dependents.filter((_, i) => i !== index);
    setDependents(newDependentes);
  };

  // att usuario
  const handleUpdateUser = async () => {
    try {
      const formData = {
        name,
        email,
        phone,
        bloodType,
        registration,
        birthDate,
        sex,
        landline,
        naturalness,
        uf_naturalidade: ufNaturalness,
        uf_orgao: ufOrganization,
        uf_address: ufAddress,
        maritalStatus: maritalStatus,
        education,
        rg,
        orgao: organization,
        cpf,
        hiringDate,
        expeditionDate,
        position,
        lotacao,
        cep,
        motherName,
        fatherName,
        city,
        street,
        complement,
        workPlace,
        shipperOrganization,
        religion,
        dependents,
      };

      // Verifica os campos faltantes diretamente, sem esperar a atualização do estado
      const fieldsMissing = checkMissingFields();

      if (fieldsMissing.length > 0) {
        setMissingFields(fieldsMissing); // Aqui você ainda pode atualizar o estado se necessário
        setOpenErrorMember(true);
        throw new Error("missing fields");
      }

      const message = await updateMembership(membershipId, formData);
      if (message) {
        throw new Error(message);
      }

      setOpenSuccessDialog(false);
      alert("usuário atualizado com sucesso!");
    } catch (error) {
      setOpenSuccessDialog(false);
      alert("Erro ao atualizar usuário");
    }
  };

  // deletar usuário
  const handleDeleteUser = async () => {
    try {
      const message = await deleteMember(membershipId);

      if (message) {
        throw new Error(message);
      }

      setOpenDeleteDialog(false);
      alert("usuário deletado com sucesso!");
      navigate("/usuarios");
    } catch {
      setOpenSuccessDialog(false);
      alert("Erro ao deletar usuário.");
    }
  };

  // validacao de campos
  const handleBlur = (e, fieldName) => {
    const { value } = e.target;
    validateField(fieldName, value);
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const checkMissingFields = () => {
    const missingFields = [];

    if (!email) missingFields.push("Email");
    if (!sex) missingFields.push("Sexo");
    if (!maritalStatus) missingFields.push("Estado Civil");
    if (!ufNaturalness) missingFields.push("UF de Naturalidade");
    if (!ufOrganization) missingFields.push("UF da Organização");
    if (!ufAddress) missingFields.push("UF do Endereço");
    if (!birthDate) missingFields.push("Data de Nascimento");
    if (!expeditionDate) missingFields.push("Data de Expedição");
    if (!lotacao) missingFields.push("Lotação");
    if (!registration) missingFields.push("Matrícula");
    if (!name) missingFields.push("Nome");
    if (!naturalness) missingFields.push("Naturalidade");
    if (!rg) missingFields.push("RG");
    if (!cpf) missingFields.push("CPF");
    if (!cep) missingFields.push("CEP");
    if (!city) missingFields.push("Cidade");
    if (!phone) missingFields.push("Celular");
    if (!shipperOrganization) missingFields.push("Órgão Expedidor");

    // Dependentes podem ser opcionais, então só adiciona se for necessário
    if (dependents.length === 0) missingFields.push("Dependentes");

    return missingFields;
  };

  const erro = (campo) => {
    return touchedFields[campo] && errors[campo] ? (
      <span className="error-message">{errors[campo]}</span>
    ) : null;
  };

  const validateField = (fieldName, value) => {
    let error = "";
    if (!value.trim()) {
      // Checks if the field is empty or just whitespace
      error = "Campo obrigatório";
    }
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

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

  return !membershipId ? (
    <div>Carregando...</div>
  ) : (
    <section className="section">
      <div className="forms-container-benefits">
        <h1>Dados do usuário</h1>
        <h3> Dados Pessoais </h3>

        <FieldText
          label="Nome Completo *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => handleBlur(e, "nomeCompleto")}
          erro={!!(touchedFields["nomeCompleto"] && errors["nomeCompleto"])} // Transforma em booleano
        />

        <div className="section-form-benefits">
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

        <div className="section-form-benefits">
          <FieldText
            label="Celular *"
            value={phone}
            onChange={(e) => setLandline(mascaraTelefone(e.target.value))}
            onBlur={(e) => handleBlur(e, "celular")}
            erro={erro("celular")}
          />

          <FieldText
            label="Telefone *"
            value={landline}
            onChange={(e) => setPhone(mascaraTelefone(e.target.value))}
            onBlur={(e) => handleBlur(e, "telefone")}
            erro={erro("telefone")}
          />
        </div>

        <h3> Endereço </h3>
        <div className="section-form-benefits">
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
        <div className="section-form-benefits">
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
              <h3>
                Adicionar Dependente{" "}
                <AddCircleOutlineIcon
                  id="addDependentBttn"
                  onClick={() => setShowDependentForm(true)}
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
                      value={
                        currentDependent.dataNasc
                          ? currentDependent.dataNasc.format("YYYY-MM-DD")
                          : ""
                      }
                      onChange={(newDate) =>
                        handleDependentChange("dataNasc", dayjs(newDate))
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
              </div>
            )}
            <div>
              {dependents.map((dependent, index) => (
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
                        onChange={() => {}}
                      />
                      <FieldText
                        label="Data de Nascimento"
                        value={dayjs(dependent.dataNasc).format("DD/MM/YYYY")}
                        onChange={() => {}}
                      />

                      <FieldText
                        label="Parentesco"
                        value={dependent.parentesco}
                        onChange={() => {}}
                      />

                      <FieldText
                        label="CPF"
                        value={dependent.cpfDependente}
                        onChange={() => {}}
                      />

                      <FieldText
                        label="Celular"
                        value={dependent.celularDependente}
                        onChange={() => {}}
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
          </div>
          <div
            className="double-box"
            style={{ gap: "40px", alignItems: "center" }}
          >
            <PrimaryButton
              text="Atualizar dados do Usuário"
              onClick={() => {
                setOpenSuccessDialog(true);
              }}
            />
            <SecondaryButton
              text="Deletar Usuário"
              onClick={() => setOpenDeleteDialog(true)}
            />
          </div>

          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={() => setOpenError(false)}
          >
            <Alert onClose={() => setOpenError(false)} severity="error">
              Certifique-se de que todos os campos estão preenchidos
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorMember}
            autoHideDuration={6000}
            onClose={() => {
              setOpenErrorMember(false);
              setMissingFields([]);
            }}
          >
            <Alert
              onClose={() => {
                setMissingFields([]);
              }}
              severity="warning"
            >
              Existem campos não preenchidos ou inválidos:
              <div style={{ whiteSpace: "pre-line" }}>
                {missingFields.join("\n")}
              </div>
            </Alert>
          </Snackbar>

          <footer style={{ height: "100px" }} />
        </div>
        <Modal
          show={openSuccessDialog}
          width="400px"
          alertTitle="Ao confirmar você estará alterando os dados do usuário."
          alert="deseja confirmar a ação?"
        >
          {" "}
          <SecondaryButton
            text="Não"
            onClick={() => setOpenSuccessDialog(false)}
            width="100px"
          />
          <PrimaryButton
            text="Sim"
            onClick={() => handleUpdateUser()}
            width="100px"
          />
        </Modal>
        <Modal
          show={openDeleteDialog}
          width="400px"
          alertTitle="Ao confirmar você estará deletando os dados do usuário."
          alert="deseja confirmar a ação?"
        >
          {" "}
          <SecondaryButton
            text="Não"
            onClick={() => setOpenDeleteDialog(false)}
            width="100px"
          />
          <PrimaryButton
            text="Sim"
            onClick={() => handleDeleteUser()}
            width="100px"
          />
        </Modal>
      </div>
    </section>
  );
};

export default ViewMembershipPage;
