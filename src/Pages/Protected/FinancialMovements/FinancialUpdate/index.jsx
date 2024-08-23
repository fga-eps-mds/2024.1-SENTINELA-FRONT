import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
import Modal from "../../../../Components/Modal";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import "./index.css";
import DataSelect from "../../../../Components/DataSelect";
import CheckField from "../../../../Components/Checkfield";
import {
  getFinancialMovementsById,
  updateFinancialMovementsById,
  deleteFinancialMovementsById,
} from "../../../../Services/FinancialMovementsService";
import { getUsers } from "../../../../Services/userService";
import { getSupplierForm } from "../../../../Services/supplierService";
import dayjs from "dayjs";

export default function FinancialUpdate() {
  const [contaOrigem, setContaOrigem] = useState("");
  const [contaDestino, setContaDestino] = useState("");
  const [nomeOrigem, setNomeOrigem] = useState("");
  const [nomeDestino, setNomeDestino] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [cpFCnpj, setcpFCnpj] = useState("");
  const [valorBruto, setValorBruto] = useState("");
  const [valorLiquido, setValorLiquido] = useState("");
  const [acrescimo, setAcrescimo] = useState("");
  const [desconto, setDesconto] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [dataVencimento, setDataVencimento] = useState(null);
  const [dataPagamento, setDataPagamento] = useState(null);
  const [baixada, setBaixada] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [nomesOrigem, setNomesOrigem] = useState([]);
  const [nomesDestino, setNomesDestino] = useState([]);
  const maxDescricaoLength = 130;

  const navigate = useNavigate();
  const location = useLocation();
  const movementId = location.state?.movementId;

  useEffect(() => {
    const fetchMovement = async () => {
      if (movementId) {
        try {
          const data = await getFinancialMovementsById(movementId);
          setContaOrigem(data.contaOrigem || "");
          setContaDestino(data.contaDestino || "");
          setNomeOrigem(data.nomeOrigem || "");
          setNomeDestino(data.nomeDestino || "");
          setTipoDocumento(data.tipoDocumento || "");
          setcpFCnpj(data.cpFCnpj || "");
          setValorBruto(data.valorBruto || "");
          setValorLiquido(data.valorLiquido || "");
          setAcrescimo(data.acrescimo || "");
          setDesconto(data.desconto || "");
          setPagamento(data.formadePagamento || "");
          setDataVencimento(dayjs(data.datadeVencimento || null));
          setDataPagamento(dayjs(data.datadePagamento || null));
          setBaixada(data.baixada || false);
          setDescricao(data.descricao || "");
        } catch (error) {
          console.error("Erro ao buscar dados da movimentação:", error);
        }
      }
    };

    fetchMovement();
  }, [movementId]);

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

  const handleSave = async () => {
    setShowSaveModal(false);
    try {
      const updatedData = {
        contaOrigem,
        contaDestino,
        nomeOrigem,
        nomeDestino,
        tipoDocumento,
        cpFCnpj,
        valorBruto,
        valorLiquido,
        acrescimo,
        desconto,
        formadePagamento: pagamento,
        datadeVencimento: dataVencimento,
        datadePagamento: dataPagamento,
        baixada,
        descricao,
      };
      await updateFinancialMovementsById(movementId, updatedData);
      setShowSaveModal(true);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFinancialMovementsById(movementId);
      setShowDeletedModal(true);
    } catch (error) {
      console.error("Erro ao deletar movimentação:", error);
    }
  };

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

  const handleChangeNomeOrigem = (event) => {
    console.log("Nome Origem:", event.target.value);
    setNomeOrigem(event.target.value);
  };

  const handleChangeNomeDestino = (event) => {
    console.log("Nome Destino:", event.target.value);
    setNomeDestino(event.target.value);
  };

  const handleChangeContaOrigem = (event) => {
    console.log("Conta Origem:", event.target.value);
    setContaOrigem(event.target.value);
  };

  const handleChangeContaDestino = (event) => {
    console.log("Conta Destino:", event.target.value);
    setContaDestino(event.target.value);
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

  return (
    <section className="container">
      <div className="forms-container">
        <h1> Visualização de Movimentações Financeiras </h1>
        <h3>Dados da movimentação financeira</h3>

        <div className="double-box-fin">
          <FieldSelect
            label="Conta origem"
            value={contaOrigem}
            onChange={handleChangeContaOrigem}
            options={["Fornecedor", "Sindicalizado", "Sindicato"]}
          />
          <FieldSelect
            label="Conta destino"
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
          <FieldText
            label="Tipo Documento"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
          />
          <FieldText
            label="CPF/CNPJ"
            value={cpFCnpj}
            onChange={(e) => setcpFCnpj(handleCpfCnpjInput(e.target.value))}
          />
          <FieldText
            label="Valor Bruto *"
            value={valorBruto}
            onChange={(e) => setValorBruto(handleCurrencyInput(e.target.value))}
          />
          <FieldText
            label="Valor Liquído"
            value={valorLiquido}
            onChange={(e) =>
              setValorLiquido(handleCurrencyInput(e.target.value))
            }
          />
          <FieldText
            label="Acréscimo"
            value={acrescimo}
            onChange={(e) => setAcrescimo(handleCurrencyInput(e.target.value))}
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
          label="Descrição *"
          value={descricao}
          onChange={handleChangeDescricao}
        />
        <div>
          <small>
            {descricao.length}/{maxDescricaoLength} caracteres
          </small>
        </div>
        <div className="double-buttons-mov">
          <SecondaryButton
            text="Deletar"
            onClick={() => setShowDeleteModal(true)}
          />
          <PrimaryButton text="Salvar" onClick={handleSave} />
        </div>

        <Modal alertTitle="Alterações Salvas" show={showSaveModal}>
          <SecondaryButton
            key={"saveButtons"}
            text="OK"
            onClick={() => {
              setShowSaveModal(false);
              navigate("/movimentacoes/lista");
            }}
            width="338px"
          />
        </Modal>

        <Modal
          alertTitle="Deseja deletar movimentação do sistema?"
          show={showDeleteModal}
        >
          <SecondaryButton
            key={"deleteButtons"}
            text="EXCLUIR MOVIMENTAÇÃO"
            onClick={handleDelete}
            width="338px"
          />
          <SecondaryButton
            key={"modalButtons"}
            text="CANCELAR E MANTER MOVIMENTAÇÃO"
            onClick={() => setShowDeleteModal(false)}
            width="338px"
          />
        </Modal>

        <Modal alertTitle="Movimentação Deletada" show={showDeletedModal}>
          <SecondaryButton
            key={"okButtons"}
            text="OK"
            onClick={() => {
              setShowDeletedModal(false);
              navigate("/movimentacoes/lista");
            }}
            width="338px"
          />
        </Modal>
      </div>
    </section>
  );
}