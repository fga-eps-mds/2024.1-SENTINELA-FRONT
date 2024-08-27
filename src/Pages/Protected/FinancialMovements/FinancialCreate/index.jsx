import { useState, useEffect } from "react";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
import Modal from "../../../../Components/Modal";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import "./index.css";
import DataSelect from "../../../../Components/DataSelect";
import CheckField from "../../../../Components/Checkfield";
import { createFinancialMovements } from "../../../../Services/FinancialMovementsService";
import { getUsers } from "../../../../Services/userService";
import { getSupplierForm } from "../../../../Services/supplierService";
import { useNavigate } from "react-router-dom";

export default function FinancialCreate() {
  const [contaOrigem, setContaOrigem] = useState("");
  const [contaDestino, setContaDestino] = useState("");
  const [nomeOrigem, setNomeOrigem] = useState("");
  const [nomeDestino, setNomeDestino] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [cpFCnpj, setCpFCnpj] = useState("");
  const [valorBruto, setValorBruto] = useState("");
  const [valorLiquido, setValorLiquido] = useState("");
  const [acrescimo, setAcrescimo] = useState("");
  const [desconto, setDesconto] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [dataVencimento, setDataVencimento] = useState(null);
  const [dataPagamento, setDataPagamento] = useState(null);
  const [baixada, setBaixada] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nomesOrigem, setNomesOrigem] = useState([]);
  const [nomesDestino, setNomesDestino] = useState([]);
  const maxDescricaoLength = 130;

  useEffect(() => {
    const fetchNomesOrigem = async () => {
      try {
        switch (contaOrigem) {
          case "Sindicalizado": {
            const users = await getUsers();
            if (Array.isArray(users)) {
              setNomesOrigem(users.map((user) => user.name));
            } else {
              console.error("Os dados recebidos não são um array.");
            }
            break;
          }
          case "Sindicato": {
            setNomesOrigem(["Conta BRB", "Conta Mercado Pago"]);
            break;
          }
          case "Fornecedor": {
            const suppliers = await getSupplierForm();
            if (Array.isArray(suppliers)) {
              setNomesOrigem(suppliers.map((supplier) => supplier.nome));
            } else {
              console.error("Os dados recebidos não são um array.");
            }
            break;
          }
          default:
            console.error("Tipo de conta desconhecido.");
        }
      } catch (error) {
        console.error("Erro ao buscar lista de nomes:", error);
      }
    };

    if (contaOrigem) fetchNomesOrigem();
  }, [contaOrigem]);

  useEffect(() => {
    const fetchNomesDestino = async () => {
      try {
        switch (contaDestino) {
          case "Sindicalizado": {
            const users = await getUsers();
            if (Array.isArray(users)) {
              setNomesDestino(users.map((user) => user.name));
            } else {
              console.error("Os dados recebidos não são um array.");
            }
            break;
          }
          case "Sindicato": {
            setNomesDestino(["Conta BRB", "Conta Mercado Pago"]);
            break;
          }
          case "Fornecedor": {
            const suppliers = await getSupplierForm();
            if (Array.isArray(suppliers)) {
              setNomesDestino(suppliers.map((supplier) => supplier.nome));
            } else {
              console.error("Os dados recebidos não são um array.");
            }
            break;
          }
          default:
            console.error("Tipo de conta desconhecido.");
        }
      } catch (error) {
        console.error("Erro ao buscar lista de nomes:", error);
      }
    };

    if (contaDestino) fetchNomesDestino();
  }, [contaDestino]);

  const handleCurrencyInput = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue ? (parseFloat(numericValue) / 100).toFixed(2) : ""; // Converte para valor monetário
  };

  const handleCpfCnpjInput = (value) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 11) {
      return numericValue
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14); // CPF formatado
    } else {
      return numericValue
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
        .slice(0, 18); // CNPJ formatado
    }
  };

  const handleChangeContaOrigem = (event) => {
    console.log("Conta Origem:", event.target.value);
    setContaOrigem(event.target.value);
  };

  const handleChangeContaDestino = (event) => {
    console.log("Conta Destino:", event.target.value);
    setContaDestino(event.target.value);
  };

  const handleChangeNomeOrigem = (event) => {
    console.log("Nome Origem:", event.target.value);
    setNomeOrigem(event.target.value);
  };

  const handleChangeNomeDestino = (event) => {
    console.log("Nome Destino:", event.target.value);
    setNomeDestino(event.target.value);
  };

  const handleChangeTipoDocumento = (event) => {
    console.log("Tipo Documento:", event.target.value);
    setTipoDocumento(event.target.value);
  };

  const handleChangePagamento = (event) => {
    console.log("Forma de Pagamento:", event.target.value);
    setPagamento(event.target.value);
  };

  const handleChangeBaixada = (newChecked) => {
    console.log("Baixada:", newChecked);
    setBaixada(newChecked);
  };

  const handleChangeDescricao = (event) => {
    const { value } = event.target;
    if (value.length <= maxDescricaoLength) {
      setDescricao(value);
    }
  };

  const navigate = useNavigate();

  const handleCloseDialog = () => {
    navigate("/movimentacoes/lista");
    setShowModal(false);
  };

  const handleSubmit = async () => {
    const financialData = {
      contaOrigem,
      contaDestino,
      nomeOrigem,
      nomeDestino,
      tipoDocumento,
      cpFCnpj,
      valorBruto: parseFloat(valorBruto),
      valorLiquido: parseFloat(valorLiquido),
      acrescimo: parseFloat(acrescimo),
      desconto: parseFloat(desconto),
      formadePagamento: pagamento,
      datadeVencimento: dataVencimento,
      datadePagamento: dataPagamento,
      baixada,
      descricao,
    };

    console.log("Dados enviados ao backend:", financialData);

    const error = await createFinancialMovements(financialData);

    if (
      !contaOrigem ||
      !contaDestino ||
      !nomeOrigem ||
      !nomeDestino ||
      !dataVencimento ||
      !tipoDocumento ||
      !valorBruto
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (descricao.length > 130) {
      alert("limite de caracteres excedido!");
      return;
    }

    if (!error) {
      console.log("Cadastro realizado com sucesso.");
      setShowModal(true);
    } else {
      console.error("Erro ao cadastrar movimentação financeira:", error);
    }
  };

  return (
    <section className="container">
      <div className="forms-container">
        <h1> Cadastro de Movimentações Financeiras </h1>
        <h3>Dados da Movimentação</h3>

        <div className="double-box-fin">
          <FieldSelect
            label="Conta origem *"
            value={contaOrigem}
            onChange={handleChangeContaOrigem}
            options={["Fornecedor", "Sindicalizado", "Sindicato"]}
          />
          <FieldSelect
            label="Conta destino *"
            value={contaDestino}
            onChange={handleChangeContaDestino}
            options={["Fornecedor", "Sindicalizado", "Sindicato"]}
          />
          <FieldSelect
            label="Nome origem *"
            value={nomeOrigem}
            onChange={handleChangeNomeOrigem}
            options={nomesOrigem}
          />
          <FieldSelect
            label="Nome Destino *"
            value={nomeDestino}
            onChange={handleChangeNomeDestino}
            options={nomesDestino}
          />
          <FieldSelect
            label="Tipo documento *"
            onChange={handleChangeTipoDocumento}
            value={tipoDocumento}
            options={[
              "",
              "AÇÃO JUDICIAL",
              "ACORDO EXTRAJUDICIAL",
              "ADVOGADO",
              "ALUGUEL",
              "APLICAÇÃO FINANCEIRA",
              "ASSEMBLEIA",
              "ASSESSORIA COMUNICAÇÃO",
              "CARTÓRIO",
              "CELULAR",
              "COMBUSTÍVEL",
              "CONDOMÍNO",
              "CONTABILIDADE",
              "CONVÊNIO",
              "CUSTAS JUDICIAIS",
              "DARF",
              "DAR-GDF",
              "DIVERSOS",
              "DOAÇÕES",
              "DPVAT",
              "ENERGIA",
              "ESTÁGIO",
              "EVENTOS",
              "EXPEDIENTE",
              "FGTS",
              "FIXO/INTERNET",
              "FUNCIONÁRIO",
              "GPS (INSS)",
              "IMÓVEL - SEDE SINDPEN",
              "INDENIZAÇÃO",
              "IPTU",
              "IPVA",
              "LAZER",
              "LICENCIAMENTO",
              "MULTA",
              "PAPELARIA",
              "PATROCÍNIO",
              "REEMBOLSO",
              "RESCISÃO CONTRATO TRAB.",
              "RESTAURANTE",
              "SEGURO VIDA",
              "TARIFAS BANCÁRIAS",
              "PUBLICIDADE",
            ]}
          />
          <FieldText
            label="CPF/CNPJ"
            onChange={(e) => setCpFCnpj(handleCpfCnpjInput(e.target.value))}
            value={cpFCnpj}
          />
          <FieldText
            label="Valor Bruto *"
            onChange={(e) => setValorBruto(handleCurrencyInput(e.target.value))}
            value={valorBruto}
          />
          <FieldText
            label="Valor Liquído"
            onChange={(e) =>
              setValorLiquido(handleCurrencyInput(e.target.value))
            }
            value={valorLiquido}
          />
          <FieldText
            label="Acréscimo"
            onChange={(e) => setAcrescimo(handleCurrencyInput(e.target.value))}
            value={acrescimo}
          />
          <FieldText
            label="Desconto"
            value={desconto}
            onChange={(e) => setDesconto(handleCurrencyInput(e.target.value))}
          />

          <FieldSelect
            label="Forma de Pagamento *"
            value={pagamento}
            onChange={handleChangePagamento}
            options={[
              "Crédito",
              "Débito",
              "PIX",
              "Dinheiro",
              "Boleto",
              "Cheque",
              "Depósito",
            ]}
          />
          <DataSelect
            label="Data de vencimento *"
            value={dataVencimento}
            onChange={(newValue) => setDataVencimento(newValue)}
          />
          <DataSelect
            label="Data de pagamento *"
            value={dataPagamento}
            onChange={(newValue) => setDataPagamento(newValue)}
          />
          <CheckField
            label="Baixada"
            value={baixada}
            onChange={handleChangeBaixada}
          />
        </div>

        <FieldText
          label="Descrição"
          onChange={handleChangeDescricao}
          value={descricao}
        />
        <div>
          <small>
            {descricao.length}/{maxDescricaoLength} caracteres
          </small>
        </div>
        <PrimaryButton text="Cadastrar" onClick={handleSubmit} />
        <Modal
          width="338px"
          alertTitle="Cadastro de movimentação concluído"
          show={showModal}
        >
          <SecondaryButton
            key={"modalButtons"}
            text="OK"
            onClick={handleCloseDialog}
            width="338px"
          />
        </Modal>
      </div>
    </section>
  );
}
