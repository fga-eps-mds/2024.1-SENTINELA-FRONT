import { generateReport } from "./reportService";

export const generateFinancialReport = async ({
  contaOrigem,
  contaDestino,
  nomeOrigem,
  nomeDestino,
  tipoDocumento,
  sitPagamento,
  formArquivo,
  dataInicio,
  dataFinal,
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
  };
  const fileName = `financial_report.${formArquivo.toLowerCase()}`;
  return generateReport(reportData, formArquivo.toLowerCase(), fileName);
};