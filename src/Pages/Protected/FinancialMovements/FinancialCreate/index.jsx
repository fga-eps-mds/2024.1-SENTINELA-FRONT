// import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import FieldNumber from "../../../../Components/FieldNumber";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
// import Modal from "../../../../Components/Modal";
import PrimaryButton from "../../../../Components/PrimaryButton";
// import SecondaryButton from "../../../../Components/SecondaryButton";
import "./index.css";
// import dayjs from "dayjs";
// import "dayjs/locale/pt-br";
import DataSelect from "../../../../Components/DataSelect";
import CheckField from "../../../../Components/Checkfield";

export default function FinancialCreate() {
  //   const navigate = useNavigate();
  const [contaOrigem, setContaOrigem] = useState("");
  const [contaDestino, setContaDestino] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [valorBruto, setValorBruto] = useState("");
  const [valorLiquido, setValorLiquido] = useState("");
  const [acrescimo, setAcrescimo] = useState("");
  const [desconto, setDesconto] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [dataVencimento, setDataVencimento] = useState(null);
  const [dataPagamento, setdataPagamento] = useState(null);
  const [baixada, setBaixada] = useState("");
  const [descricao, setDescricao] = useState("");
  // const [showModal, setShowModal] = useState(false);

  const handleChangeContaOrigem = (event) => {
    setContaOrigem(event.target.value);
  };

  const handleChangeContaDestino = (event) => {
    setContaDestino(event.target.value);
  };

  const handleChangePagamento = (event) => {
    setPagamento(event.target.value);
  };

  const handleChangeBaixada = (event) => {
    setBaixada(event.target.value);
  };

  // const handleCloseDialog = () => {
  //   setShowModal(false);
  // };

  const handleSubmit = () => {};

  return (
    <section className="container">
      <div className="forms-container">
        <h1> Cadastro de Movimentações Financeiras </h1>
        <h3>Dados da Movimentação</h3>

        <div className="double-box">
          <FieldSelect
            label="Conta origem"
            value={contaOrigem}
            onChange={handleChangeContaOrigem}
            options={["teste", "teste2"]}
          />
          <FieldSelect
            label="Conta destino"
            value={contaDestino}
            onChange={handleChangeContaDestino}
            options={["teste", "teste-X"]}
          />
          <FieldText
            label="Tipo documento"
            onChange={(e) => setTipoDocumento(e.target.value)}
            value={tipoDocumento}
          />
          <FieldText
            label="CPF/CNPJ"
            onChange={(e) => setCpfCnpj(e.target.value)}
            value={cpfCnpj}
          />
          <FieldText
            label="Valor Bruto"
            onChange={(e) => setValorBruto(e.target.value)}
            value={valorBruto}
          />
          <FieldText
            label="Valor Liquído"
            onChange={(e) => setValorLiquido(e.target.value)}
            value={valorLiquido}
          />
          <FieldText
            label="Acrescimo"
            onChange={(e) => setAcrescimo(e.target.value)}
            value={acrescimo}
          />
          <FieldText
            label="Desconto"
            value={desconto}
            onChange={(e) => setDesconto(e.target.value)}
          />

          <FieldSelect
            label="Forma de Pagamento *"
            value={pagamento}
            onChange={handleChangePagamento}
            options={["pix", "débito", "crédito", "boleto"]}
          />
          <DataSelect
            label="Data de vencimento"
            value={dataVencimento}
            onChange={(newValue) => setDataVencimento(newValue)}
          />
          <DataSelect
            label="Data de pagamento"
            value={dataPagamento}
            onChange={(newValue) => setdataPagamento(newValue)}
          />
          <CheckField
            label="Baixada"
            value={baixada}
            checked={false}
            onChange={handleChangeBaixada}
          />
        </div>

        <FieldText
          label="Descrição"
          onChange={(e) => setDescricao(e.target.value)}
          value={descricao}
        />
        <PrimaryButton text="Cadastrar" onClick={handleSubmit} />
      </div>
    </section>
  );
}
