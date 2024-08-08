import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldNumber from "../../../../Components/FieldNumber";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
import Modal from "../../../../Components/Modal";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import "./index.css";

export default function FinancialCreate() {
  const navigate = useNavigate();
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
  const [showModal, setShowModal] = useState(false);

  const handleChangeContaOrigem = (event) => {
    setContaOrigem(event.target.value);
  };

  const handleChangeContaDestino = (event) => {
    setContaDestino(event.target.value);
  };

  const handleCloseDialog = () => {
    setShowModal(false);
  };

  return (
    <section className="container-user">
      <div className="forms-container-user">
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
            onChange={setTipoDocumento}
            value={tipoDocumento}
          />
          <FieldText label="Cpf/Cnpj" onChange={setCpfCnpj} value={cpfCnpj} />
          <FieldText
            label="Valor Bruto"
            onChange={setValorBruto}
            value={valorBruto}
          />
          <FieldText
            label="Valor Liquído"
            onChange={setValorLiquido}
            value={valorLiquido}
          />
          <FieldText
            label="Acrescimo"
            onChange={setAcrescimo}
            value={acrescimo}
          />
          <FieldText label="Desconto" onChange={setDesconto} value={desconto} />
        </div>
      </div>
    </section>
  );
}
