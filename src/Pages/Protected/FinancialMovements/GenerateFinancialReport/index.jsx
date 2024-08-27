import { useState } from "react";
import DataSelect from "../../../../Components/DataSelect";
import FieldSelect from "../../../../Components/FieldSelect";
//import PrimaryButton from "../../../../Components/PrimaryButton";

export default function GenerateFinancialReport() {
  const [fornecedor] = useState("");
  const [tipoLancamento, setTipoLancamento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [contaBancaria, setContaBancaria] = useState("");
  const [sitPagamento, setSitPagamento] = useState("");
  const [formArquivo, setFormArquivo] = useState("");
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  const handleChangeTipoLancamento = (event) => {
    console.log("Tipo lançamento: ", event.target.value);
    setTipoLancamento(event.target.value);
  };

  const handleChangeContaBancaria = (event) => {
    console.log("Conta bancária:", event.target.value);
    setContaBancaria(event.target.value);
  };

  const handleChangeTipoDocumento = (event) => {
    console.log("Tipo Documento:", event.target.value);
    setTipoDocumento(event.target.value);
  };

  const handleChangeSitPagamento = (event) => {
    console.log("Situação Pagamento:", event.target.value);
    setSitPagamento(event.target.value);
  };

  const handleFormArquivo = (event) => {
    console.log("Formato do arquivo: ", event.target.value);
    setFormArquivo(event.target.value);
  };

  return (
    <section className="container-financial-report">
      <div className="forms-container-financial-report">
        <h1> Gerar relatório financeiro </h1>

        <div className="double-box-fin">
          <FieldSelect
            label="Empresa/Fornecedor"
            value={fornecedor}
            onChange={""}
            options={["Empresa", "Fornecedor"]}
          />
          <FieldSelect
            label="Tipo de lançamento"
            value={tipoLancamento}
            onChange={handleChangeTipoLancamento}
            options={["Entrada", "Saída"]}
          />
          <FieldSelect
            label="Tipo de documento"
            value={tipoDocumento}
            onChange={handleChangeTipoDocumento}
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
          <FieldSelect
            label="Conta Bancária"
            value={contaBancaria}
            onChange={handleChangeContaBancaria}
            options={["Conta BRB", "Conta Mercado Pago"]}
          />
          <FieldSelect
            label="Situação de pagamento"
            value={sitPagamento}
            onChange={handleChangeSitPagamento}
            options={["Pago", "Não pago"]}
          />
          <FieldSelect
            label="Formato de arquivo"
            value={formArquivo}
            onChange={handleFormArquivo}
            options={["CSV", "PDF"]}
          />
          <DataSelect
            label="Data início"
            value={dataInicio}
            onChange={(newValue) => setDataInicio(newValue)}
          />
          <DataSelect
            label="Data final"
            value={dataFinal}
            onChange={(newValue) => setDataFinal(newValue)}
          />
        </div>
      </div>
    </section>
  );
}
