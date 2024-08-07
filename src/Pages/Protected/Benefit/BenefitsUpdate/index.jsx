import dayjs from "dayjs";
import "./index.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FieldText from "../../../../Components/FieldText";
import FieldSelect from "../../../../Components/FieldSelect";
import DataSelect from "../../../../Components/DataSelect";
import FieldTextCheckbox from "../../../../Components/FieldTextCheckbox";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import Modal from "../../../../Components/Modal";
import {
  getBenefitsFormById,
  updateBenefitsFormById,
  deleteBenefitsFormById,
} from "../../../../Services/benefitsService";
//import { isValidEmail } from "../../../../Services/benefitsService";

export default function BenefitsUpdate() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const benefitsId = state?.benefitsId;

  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [ans, setAns] = useState("");
  const [categoria, setCategoria] = useState("");
  const [statusConvenio, setStatusConvenio] = useState("");
  const [dataCadastro, setDataCadastro] = useState(null);
  const [considerarIr, setConsiderarIr] = useState("");
  const [descontoAut, setDescontoAut] = useState("");
  const [logotipo, setLogotipo] = useState("");
  const [site, setSite] = useState("");
  const [email, setEmail] = useState("");
  const [telefCelular, setTelefCelular] = useState("");
  const [dataAssinatura, setDataAssinatura] = useState(null);
  const [dataInicio, setDataInicio] = useState(null);
  const [sitContrato, setSitContrato] = useState("");
  const [dataFinal, setDataFinal] = useState(null);
  const [contratoSit, setContratoSit] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  const tipoPessoaList = ["Jurídica", "Física"];
  const categoriaList = [
    "Alimentação",
    "Artes",
    "Escolas",
    "Academias",
    "Outros",
  ];
  const statusConvenioList = ["Ativo", "Inativo"];
  const considerarIrList = ["Sim", "Não"];
  const descontoAutList = ["Sim", "Não"];
  const sitContratoList = ["Concluído", "Pendência", "Cancelado"];

  const handleChangeTipoPessoa = (event) => {
    setTipoPessoa(event.target.value);
  };

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const handleChangeStatusConvenio = (event) => {
    setStatusConvenio(event.target.value);
  };

  const handleChangeConsiderarIr = (event) => {
    setConsiderarIr(event.target.value);
  };

  const handleChangeDescontoAut = (event) => {
    setDescontoAut(event.target.value);
  };

  const handleChangeSitContrato = (event) => {
    setSitContrato(event.target.value);
  };

  const mascaraCpfCnpj = (cpfCnpj) => {
    let formattedValue = cpfCnpj.replace(/\D/g, "");
    if (formattedValue.length > 14) {
      formattedValue = formattedValue.slice(0, 14);
    }
    if (formattedValue.length <= 11) {
      return formattedValue
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return formattedValue
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };

  const mascaraTelefCelular = (telefCelular) => {
    let formattedNumero = telefCelular.replace(/\D/g, "");
    if (formattedNumero.length > 11) {
      formattedNumero = formattedNumero.slice(0, 11);
    }
    if (formattedNumero.length === 11) {
      return formattedNumero
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2");
    } else {
      return formattedNumero
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{4})(\d{4})$/, "$1-$2");
    }
  };

  const handleDeleteBenefitsButton = async () => {
    await deleteBenefitsFormById(benefitsId);
    navigate("/beneficios/lista");
  };

  const handleSaveModal = () => {
    setShowSaveModal(true);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCloseDialog = () => {
    setShowDeleteModal(false);
  };

  const handleDeletedCloseDialog = () => {
    setShowDeletedModal(false);
    navigate("/beneficios/lista");
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length) {
      setLogotipo(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result; // String base64 do arquivo
        setLogotipo(base64Image);
      };
      reader.readAsDataURL(file); // Converte o arquivo para base64
    }
  };

  useEffect(() => {
    const loadBenefits = async () => {
      const benefits = await getBenefitsFormById(benefitsId);
      setNome(benefits.nome);
      setRazaoSocial(benefits.razaoSocial);
      setDescricao(benefits.descricao);
      setTipoPessoa(benefits.tipoPessoa);
      setCpfCnpj(benefits.cpfCnpj);
      setAns(benefits.ans);
      setCategoria(benefits.categoria);
      setStatusConvenio(benefits.statusConvenio);
      setDataCadastro(dayjs(benefits.dataCadastro));
      setConsiderarIr(benefits.considerarIr);
      setDescontoAut(benefits.descontoAut);
      setLogotipo(benefits.logotipo);
      setSite(benefits.site);
      setEmail(benefits.email);
      setTelefCelular(benefits.telefCelular);
      setDataAssinatura(dayjs(benefits.dataAssinatura));
      setDataInicio(dayjs(benefits.dataInicio));
      setSitContrato(benefits.sitContrato);
      setDataFinal(dayjs(benefits.dataFinal));
      setContratoSit(benefits.contratoSit);
      setIsChecked(benefits.contratoSit);

      console.log(benefits); // TIRAR
    };
    loadBenefits();
  }, []);

  const handleUpdateBenefitsButton = async () => {
    const benefitsData = {
      nome,
      razaoSocial,
      descricao,
      tipoPessoa,
      cpfCnpj,
      ans,
      categoria,
      statusConvenio,
      dataCadastro,
      considerarIr,
      descontoAut,
      logotipo,
      site,
      email,
      telefCelular,
      dataAssinatura,
      dataInicio,
      sitContrato,
      dataFinal,
      contratoSit: isChecked,
    };
    await updateBenefitsFormById(benefitsId, benefitsData);
    navigate("/beneficios/lista");
  };

  return (
    <div className="container">
      <div className="forms-container">
        <h1>Visualização de convênios</h1>

        <h3>Dados do convênio</h3>

        <div className="section-form">
          <FieldText
            label="Nome fantasia *"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <FieldText
            label="Razão social *"
            value={razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
            disabled={true}
          />
        </div>

        <FieldText
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <div className="section-form">
          <FieldSelect
            label="Classificação de pessoa"
            value={tipoPessoa}
            onChange={handleChangeTipoPessoa}
            options={tipoPessoaList}
          />

          <FieldText
            label="CPF/CNPJ"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(mascaraCpfCnpj(e.target.value))}
          />

          <FieldText
            label="ANS"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />

          <FieldSelect
            label="Categoria"
            value={categoria}
            onChange={handleChangeCategoria}
            options={categoriaList}
          />

          <FieldSelect
            label="Status *"
            value={statusConvenio}
            onChange={handleChangeStatusConvenio}
            options={statusConvenioList}
          />

          <DataSelect
            label="Data de cadastro"
            value={dataCadastro}
            onChange={(newValue) => setDataCadastro(newValue)}
          />

          <FieldSelect
            label="Considerado no IR *"
            value={considerarIr}
            onChange={handleChangeConsiderarIr}
            options={considerarIrList}
          />

          <FieldSelect
            label="Desconto automático *"
            value={descontoAut}
            onChange={handleChangeDescontoAut}
            options={descontoAutList}
          />

          <div
            className="file-drop-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div className="file-upload-container">
              <p className="change-file-logotipo">Logotipo</p>

              <input
                type="file"
                id="fileInput"
                className="file-input"
                onChange={handleFileSelect}
              />
            </div>
            {logotipo && (
              <a href={logotipo} target="_blank" rel="noopener noreferrer">
                Ver Logotipo
              </a>
            )}
          </div>

          <FieldText
            label="Site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />

          <FieldText
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FieldText
            label="Telefone/Celular"
            value={telefCelular}
            onChange={(e) =>
              setTelefCelular(mascaraTelefCelular(e.target.value))
            }
          />
        </div>

        <h3>Dados do contrato de convênio</h3>

        <div className="section-form">
          <DataSelect
            label="Data de assinatura"
            value={dataAssinatura}
            onChange={(newValue) => setDataAssinatura(newValue)}
          />

          <DataSelect
            label="Data de início"
            value={dataInicio}
            onChange={(newValue) => setDataInicio(newValue)}
          />

          <FieldSelect
            label="Situação"
            value={sitContrato}
            onChange={handleChangeSitContrato}
            options={sitContratoList}
          />

          <DataSelect
            label="Data final"
            value={dataFinal}
            onChange={(newValue) => setDataFinal(newValue)}
          />
        </div>

        <FieldTextCheckbox
          label="Contrato entregue"
          value={contratoSit}
          onChange={(e) => setContratoSit(e.target.value)}
          checked={isChecked}
          onCheckboxChange={(e) => setIsChecked(e.target.checked)}
          disabled={true}
        />

        <div className="double-buttons">
          <SecondaryButton text="Deletar" onClick={handleDeleteModal} />

          <PrimaryButton text="Salvar" onClick={handleSaveModal} />
        </div>

        <Modal alertTitle="Alterações Salvas" show={showSaveModal}>
          <SecondaryButton
            key={"saveButtons"}
            text="OK"
            onClick={() => handleUpdateBenefitsButton()}
          />
        </Modal>

        <Modal
          alertTitle="Deseja deletar o convênio do sistema?"
          show={showDeleteModal}
        >
          <SecondaryButton
            key={"deleteButtons"}
            text="EXCLUIR CONVÊNIO"
            onClick={() => handleDeleteBenefitsButton()}
            width="338px"
          />
          <SecondaryButton
            key={"modalButtons"}
            text="CANCELAR E MANTER O CADASTRO"
            onClick={() => handleDeleteCloseDialog()}
            width="338px"
          />
        </Modal>

        <Modal alertTitle="Convênio deletado" show={showDeletedModal}>
          <SecondaryButton
            key={"modalButtons"}
            text="OK"
            onClick={() => handleDeletedCloseDialog()}
            width="338px"
          />
        </Modal>
      </div>
    </div>
  );
}
