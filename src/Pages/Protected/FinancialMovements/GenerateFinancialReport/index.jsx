import { useState } from "react";
import DataSelect from "../../../../Components/DataSelect";
import FieldSelect from "../../../../Components/FieldSelect";
//import PrimaryButton from "../../../../Components/PrimaryButton";

export default function GenerateFinancialReport() {
  const [fornecedor] = useState("");
  const [tipoLancamento] = useState("");
  const [tipoDocumento] = useState("");
  const [contaBancaria] = useState("");
  const [sitPagamento] = useState("");
  const [formArquivo] = useState("");
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

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
            onChange={""}
            options={["Entrada", "Saída"]}
          />
          <FieldSelect
            label="Tipo de documento"
            value={tipoDocumento}
            onChange={""}
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
            onChange={""}
            options={["BRB", "Mercado Pago"]}
          />
          <FieldSelect
            label="Situação de pagamento"
            value={sitPagamento}
            onChange={""}
            options={["Pago", "Não pago"]}
          />
          <FieldSelect
            label="Formato de arquivo"
            value={formArquivo}
            onChange={""}
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
