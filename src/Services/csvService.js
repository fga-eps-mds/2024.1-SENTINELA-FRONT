import { APIBank } from "./BaseService";

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
}) => {
  try {
    const storagedToken = localStorage.getItem("@App:token");
    let token = null;

    if (storagedToken) {
      try {
        token = JSON.parse(storagedToken);
      } catch (error) {
        console.error("O token armazenado não é um JSON válido:", error);
      }
    }

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
        responseType: "blob", // Necessário para arquivos binários como CSV
      }
    );

    const fileURL = window.URL.createObjectURL(
      new Blob([response.data], { type: "text/csv" })
    );
    const fileLink = document.createElement("a");
    fileLink.href = fileURL;
    fileLink.setAttribute("download", "financial_report.csv");
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();

    console.log("Relatório CSV gerado com sucesso");
    return false;
  } catch (error) {
    const errorMessage = error?.response?.data?.text
      ? await error.response.data.text()
      : "Unknown error";
    console.error("Erro ao gerar relatório CSV:", errorMessage);
    return true;
  }
};
