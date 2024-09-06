import { useState, useEffect } from "react";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
import Modal from "../../../../Components/Modal";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import "./index.css";
import DataSelect from "../../../../Components/DataSelect";
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
  const [descricao, setDescricao] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nomesOrigem, setNomesOrigem] = useState([]);
  const [nomesDestino, setNomesDestino] = useState([]);
  const [numericValorBruto, setNumericValorBruto] = useState(0);
  const [numericValorLiquido, setNumericValorLiquido] = useState(0);
  const [numericAcrescimo, setNumericAcrescimo] = useState(0);
  const [numericDesconto, setNumericDesconto] = useState(0);
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

  const handleCurrencyInput = (value, setValue, setNumericValue) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue
      ? `R$ ${(parseFloat(numericValue) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
      : "";
    setValue(formattedValue);
    setNumericValue(numericValue ? parseFloat(numericValue) / 100 : 0);
  };

  const handleCpfCnpjInput = (value) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 11) {
      return numericValue
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
    } else {
      return numericValue
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
        .slice(0, 18);
    }
  };

  const handleChangeContaOrigem = (event) => {
    setContaOrigem(event.target.value);
  };

  const handleChangeContaDestino = (event) => {
    setContaDestino(event.target.value);
  };

  const handleChangeNomeOrigem = (event) => {
    setNomeOrigem(event.target.value);
  };

  const handleChangeNomeDestino = (event) => {
    setNomeDestino(event.target.value);
  };

  const handleChangeTipoDocumento = (event) => {
    setTipoDocumento(event.target.value);
  };

  const handleChangePagamento = (event) => {
    setPagamento(event.target.value);
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
      valorBruto: numericValorBruto,
      valorLiquido: numericValorLiquido,
      acrescimo: numericAcrescimo,
      desconto: numericDesconto,
      pagamento,
      datadeVencimento: dataVencimento,
      datadePagamento: dataPagamento,
      descricao,
    };

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
      setShowModal(true);
    } else {
      console.error("Erro ao cadastrar movimentação financeira:", error);
    }
  };

  return (
    <section className="financialMovements-container">
      <div className="financialMovements-forms-container">
        <h1> Cadastro de Movimentações Financeiras </h1>
        <h3>Dados da Movimentação</h3>

        <div className="financialMovements-section-box">
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
            label="Nome destino *"
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
            label="Valor bruto *"
            onChange={(e) =>
              handleCurrencyInput(
                e.target.value,
                setValorBruto,
                setNumericValorBruto
              )
            }
            value={valorBruto}
          />
          <FieldText
            label="Valor líquido"
            onChange={(e) =>
              handleCurrencyInput(
                e.target.value,
                setValorLiquido,
                setNumericValorLiquido
              )
            }
            value={valorLiquido}
          />
          <FieldText
            label="Acréscimo"
            onChange={(e) =>
              handleCurrencyInput(
                e.target.value,
                setAcrescimo,
                setNumericAcrescimo
              )
            }
            value={acrescimo}
          />
          <FieldText
            label="Desconto"
            value={desconto}
            onChange={(e) =>
              handleCurrencyInput(
                e.target.value,
                setDesconto,
                setNumericDesconto
              )
            }
          />
          <DataSelect
            label="Data de pagamento"
            value={dataPagamento}
            onChange={(newValue) => setDataPagamento(newValue)}
          />
          <DataSelect
            label="Data de vencimento *"
            value={dataVencimento}
            onChange={(newValue) => setDataVencimento(newValue)}
          />
        </div>
        <div className="descricao-fin">
          <FieldSelect
            label="Forma de pagamento"
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
        </div>
        <div className="descricao-fin">
          <FieldText
            label="Descrição"
            onChange={handleChangeDescricao}
            value={descricao}
          />

          <div className="descricao-count">
            <small>
              {descricao.length}/{maxDescricaoLength} caracteres
            </small>
          </div>
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
