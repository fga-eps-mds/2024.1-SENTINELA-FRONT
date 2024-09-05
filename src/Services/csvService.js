import { generateReport } from "./reportService";

export const generateCSVReport = async ({
  contaOrigem,
  contaDestino,
  nomeOrigem,
  nomeDestino,
  tipoDocumento,
  sitPagamento,
  formArquivo,
  dataInicio,
  dataFinal,
  includeFields, // adicionar includeFields aqui
}) => {
  const reportData = {
    contaOrigem,
    contaDestino,
    nomeOrigem,
    nomeDestino,
    tipoDocumento,
    sitPagamento,
    formArquivo,
    dataInicio,
    dataFinal,
    includeFields, // adicionar includeFields aqui
  };
  const fileName = "financial_report.csv";
  return generateReport(reportData, "csv", fileName);
};
