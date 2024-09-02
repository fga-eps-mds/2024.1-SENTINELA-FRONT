import { useState, useEffect } from "react";
import DataSelect from "../../../../Components/DataSelect";
import FieldSelect from "../../../../Components/FieldSelect";
import PrimaryButton from "../../../../Components/PrimaryButton";
import { getSupplierForm } from "../../../../Services/supplierService";
import { generateFinancialReport } from "../../../../Services/pdfService";
import { generateCSVReport } from "../../../../Services/csvService";
import { getUsers } from "../../../../Services/userService";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import "./index.css";

const fetchNomes = async (conta, setNomes) => {
  try {
    let names = [];
    switch (conta) {
      case "Sindicalizado": {
        const users = await getUsers();
        names = Array.isArray(users) ? users.map((user) => user.name) : [];
        break;
      }
      case "Sindicato": {
        names = ["Conta BRB", "Conta Mercado Pago"];
        break;
      }
      case "Fornecedor": {
        const suppliers = await getSupplierForm();
        names = Array.isArray(suppliers)
          ? suppliers.map((supplier) => supplier.nome)
          : [];
        break;
      }
      default:
        console.error("Tipo de conta desconhecido.");
    }
    setNomes(names);
  } catch (error) {
    console.error("Erro ao buscar lista de nomes:", error);
  }
};

export default function GenerateFinancialReport() {
  const [contaOrigem, setContaOrigem] = useState("");
  const [contaDestino, setContaDestino] = useState("");
  const [nomeOrigem, setNomeOrigem] = useState("");
  const [nomeDestino, setNomeDestino] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [sitPagamento, setSitPagamento] = useState("");
  const [formArquivo, setFormArquivo] = useState("");
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [nomesOrigem, setNomesOrigem] = useState([]);
  const [nomesDestino, setNomesDestino] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [openGenerateError, setOpenGenerateError] = useState(false);

  useEffect(() => {
    if (contaOrigem) fetchNomes(contaOrigem, setNomesOrigem);
  }, [contaOrigem]);

  useEffect(() => {
    if (contaDestino) fetchNomes(contaDestino, setNomesDestino);
  }, [contaDestino]);

  const handleGenerateReport = async () => {
    try {
      const startDate = new Date(dataInicio);
      const endDate = new Date(dataFinal);
      if (!endDate || startDate > endDate) {
        console.error(
          "A data de início deve ser anterior ou igual à data final."
        );
        return;
      }

      const reportParams = {
        contaOrigem,
        contaDestino,
        nomeOrigem,
        nomeDestino,
        tipoDocumento,
        sitPagamento,
        formArquivo,
        dataInicio,
        dataFinal,
      };
      let reportGenerated;
      if (!formArquivo) {
        setOpenError("Selecione o formato de arquivo");
        return;
      }

      if (formArquivo === "CSV") {
        reportGenerated = await generateCSVReport(reportParams);
      } else {
        reportGenerated = await generateFinancialReport(reportParams);
      }
      if (!reportGenerated) {
        console.log("Relatório gerado e baixado com sucesso!");
      } else {
        console.error("Erro ao gerar o relatório.");
        setOpenGenerateError(true);
      }
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
    }
  };

  return (
    <section className="container-financial-report">
      <div className="forms-container-financial-report">
        <h1>Gerar relatório financeiro</h1>
        <div className="double-box-gfr">
          <FieldSelect
            label="Conta Origem"
            value={contaOrigem}
            onChange={(e) => setContaOrigem(e.target.value)}
            options={["Fornecedor", "Sindicalizado", "Sindicato"]}
          />
          <FieldSelect
            label="Conta Destino"
            value={contaDestino}
            onChange={(e) => setContaDestino(e.target.value)}
            options={["Fornecedor", "Sindicalizado", "Sindicato"]}
          />
          <FieldSelect
            label="Nome Origem"
            value={nomeOrigem}
            onChange={(e) => setNomeOrigem(e.target.value)}
            options={nomesOrigem}
          />
          <FieldSelect
            label="Nome Destino"
            value={nomeDestino}
            onChange={(e) => setNomeDestino(e.target.value)}
            options={nomesDestino}
          />
          <FieldSelect
            label="Tipo de documento"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
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
            label="Situação de pagamento"
            value={sitPagamento}
            onChange={(e) => setSitPagamento(e.target.value)}
            options={["Pago", "Não pago"]}
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
        <div className="box-format-pdfcsv">
          <FieldSelect
            label="Formato de arquivo*"
            value={formArquivo}
            onChange={(e) => setFormArquivo(e.target.value)}
            options={["CSV", "PDF"]}
          />
        </div>
        <div>
          <PrimaryButton
            text="Gerar relatório"
            onClick={handleGenerateReport}
          />
        </div>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={() => setOpenError(false)}
        >
          <Alert onClose={() => setOpenError(false)} severity="error">
            {openError}
          </Alert>
        </Snackbar>

        <Snackbar
          open={openGenerateError}
          autoHideDuration={6000}
          onClose={() => setOpenGenerateError(false)}
        >
          <Alert onClose={() => setOpenGenerateError(false)} severity="error">
            Não foram encontradas movimentações para o filtro selecionado
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
}
