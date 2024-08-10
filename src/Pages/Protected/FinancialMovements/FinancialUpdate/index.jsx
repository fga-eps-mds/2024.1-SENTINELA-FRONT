import { useState } from "react";
// import React from "react";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
import Modal from "../../../../Components/Modal";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import "./index.css";
import DataSelect from "../../../../Components/DataSelect";
import CheckField from "../../../../Components/Checkfield";

export default function FinancialUpdate() {
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
  const [baixada, setBaixada] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  const handleChangeContaOrigem = (event) => {
    setContaOrigem(event.target.value);
  };

  const handleChangeContaDestino = (event) => {
    setContaDestino(event.target.value);
  };

  const handleChangePagamento = (event) => {
    setPagamento(event.target.value);
  };

  const handleChangeBaixada = (newChecked) => {
    setBaixada(newChecked);
    console.log(newChecked);
  };

  const handleSaveModal = () => {
    setShowSaveModal(true);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleSave = () => {
    setShowSaveModal(false);
    console.log("Salvando alterações...");
    // Aqui você pode adicionar a lógica de salvar as alterações
  };

  const handleDelete = () => {
    setShowDeletedModal(true);
    setShowDeleteModal(false);
    console.log("Deletando usuário...");
    // Aqui você pode adicionar a lógica de deletar o usuário
  };

  const handleDeleteCloseDialog = () => {
    setShowDeleteModal(false);
  };

  const handleDeletedCloseDialog = () => {
    setShowDeletedModal(false);
    console.log("Usuário deletado");
  };

  return (
    <section className="container">
      <div className="forms-container">
        <h1> Visualização de Movimentações Financeiras </h1>
        <h3>Dados da movimentação financeira</h3>

        <div className="double-box-fin">
          <FieldSelect
            label="Conta Origem *"
            value={contaOrigem}
            onChange={handleChangeContaOrigem}
            options={["teste", "teste2"]}
          />
          <FieldSelect
            label="Conta Destino *"
            value={contaDestino}
            onChange={handleChangeContaDestino}
            options={["teste", "teste-X"]}
          />
          <FieldText
            label="Tipo Documento "
            onChange={(e) => setTipoDocumento(e.target.value)}
            value={tipoDocumento}
          />
          <FieldText
            label="CPF/CNPJ"
            onChange={(e) => setCpfCnpj(e.target.value)}
            value={cpfCnpj}
          />
          <FieldText
            label="Valor Bruto *"
            onChange={(e) => setValorBruto(e.target.value)}
            value={valorBruto}
          />
          <FieldText
            label="Valor Líquido"
            onChange={(e) => setValorLiquido(e.target.value)}
            value={valorLiquido}
          />
          <FieldText
            label="Acréscimo"
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
            label="Data de pagamento *"
            value={dataPagamento}
            onChange={(newValue) => setdataPagamento(newValue)}
          />
          <CheckField
            label="Baixada"
            value={baixada}
            onChange={handleChangeBaixada}
          />
        </div>

        <FieldText
          label="Descrição"
          onChange={(e) => setDescricao(e.target.value)}
          value={descricao}
        />

        <div className="double-buttons-mov">
          <SecondaryButton text="Deletar" onClick={handleDeleteModal} />
          <PrimaryButton text="Salvar" onClick={handleSaveModal} />
        </div>

        <Modal alertTitle="Alterações Salvas" show={showSaveModal}>
          <SecondaryButton
            key={"saveButtons"}
            text="OK"
            onClick={handleSave}
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
            onClick={handleDeleteCloseDialog}
            width="338px"
          />
        </Modal>

        <Modal alertTitle="Movimentação Deletada" show={showDeletedModal}>
          <SecondaryButton
            key={"okButtons"}
            text="OK"
            onClick={handleDeletedCloseDialog}
            width="338px"
          />
        </Modal>
      </div>
    </section>
  );
}
