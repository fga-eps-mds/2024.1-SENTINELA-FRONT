import { APIBank } from "./BaseService";

const storagedToken = localStorage.getItem("@App:token");
let token = null;

if (storagedToken) {
  try {
    token = JSON.parse(storagedToken);
  } catch (error) {
    console.error("O token armazenado não é um JSON válido:", error);
  }
}

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
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await APIBank.post(
      "/financialMovements/report",
      {
        contaOrigem,
        contaDestino,
        nomeOrigem,
        nomeDestino,
        tipoDocumento,
        sitPagamento,
        formArquivo,
        dataInicio,
        dataFinal,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Important for handling binary data like PDFs
      }
    );

    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement("a");
    fileLink.href = fileURL;
    fileLink.setAttribute(
      "download",
      `financial_report.${formArquivo.toLowerCase()}`
    );
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();

    console.log("Relatório financeiro gerado com sucesso");
    return false;
  } catch (error) {
    const errorMessage = await error.response.data.text();
    console.error("Erro ao gerar relatório financeiro:", errorMessage);
    return true;
  }
};
