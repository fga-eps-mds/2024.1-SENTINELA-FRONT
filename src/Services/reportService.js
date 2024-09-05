import { APIBank } from "./BaseService";

export const generateReport = async (reportData, fileType, fileName) => {
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
      reportData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const blobType = fileType === "csv" ? "text/csv" : "application/pdf";
    const fileURL = window.URL.createObjectURL(
      new Blob([response.data], { type: blobType })
    );
    const fileLink = document.createElement("a");
    fileLink.href = fileURL;
    fileLink.setAttribute("download", fileName);
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();

    console.log(`Relatório ${fileType.toUpperCase()} gerado com sucesso`);
    return false;
  } catch (error) {
    console.error("Erro completo:", error);
    const errorMessage = error?.response?.data?.text
      ? await error.response.data.text()
      : error.message || "Unknown error";
    console.error(
      `Erro ao gerar relatório ${fileType.toUpperCase()}:`,
      errorMessage
    );
    return true;
  }
};
