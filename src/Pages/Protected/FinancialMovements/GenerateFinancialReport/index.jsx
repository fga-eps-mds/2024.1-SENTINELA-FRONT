import { useState, useEffect } from "react";
import DataSelect from "../../../../Components/DataSelect";
import FieldSelect from "../../../../Components/FieldSelect";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import { getSupplierForm } from "../../../../Services/supplierService";
import { generateFinancialReport } from "../../../../Services/pdfService";
import { generateCSVReport } from "../../../../Services/csvService";
import { getUsers } from "../../../../Services/userService";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckboxRow from "../../../../Components/CheckboxRow";
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

  // Estados para os checkboxes
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState([true]);
  const [selectedValorBruto, setSelectedValorBruto] = useState([true]);
  const [selectedValorLiquido, setSelectedValorLiquido] = useState([true]);
  const [selectedFormaPagamento, setSelectedFormaPagamento] = useState([true]);
  const [selectedDataVencimento, setSelectedDataVencimento] = useState([true]);
  const [selectedDataPagamento, setSelectedDataPagamento] = useState([true]);
  const [selectedSitPagamento, setSelectedSitPagamento] = useState([true]);
  const [selectedDescricao, setSelectedDescricao] = useState([true]);

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

      const includeFields = {
        tipoDocumento: selectedTipoDocumento[0],
        valorBruto: selectedValorBruto[0],
        valorLiquido: selectedValorLiquido[0],
        formaPagamento: selectedFormaPagamento[0],
        dataVencimento: selectedDataVencimento[0],
        dataPagamento: selectedDataPagamento[0],
        sitPagamento: selectedSitPagamento[0],
        descricao: selectedDescricao[0],
      };

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
        includeFields,
      };

      if (!formArquivo) {
        setOpenError("Selecione o formato de arquivo");
        return;
      }

      let reportGenerated;
      if (formArquivo === "CSV") {
        reportGenerated = await generateCSVReport(reportParams);
      } else {
        reportGenerated = await generateFinancialReport(reportParams);
      }

      if (!reportGenerated) {
        console.log("Relatório gerado e baixado com sucesso!");
        clearFilters(); // Limpa os campos após a geração do relatório
        clearCheckboxes(); // Limpa os checkboxes após a geração do relatório
      } else {
        console.error("Erro ao gerar o relatório.");
        setOpenGenerateError(true);
      }
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
    }
  };

  const clearCheckboxes = () => {
    setSelectedTipoDocumento([true]);
    setSelectedValorBruto([true]);
    setSelectedValorLiquido([true]);
    setSelectedFormaPagamento([true]);
    setSelectedDataVencimento([true]);
    setSelectedDataPagamento([true]);
    setSelectedSitPagamento([true]);
    setSelectedDescricao([true]);
  };

  const clearFilters = () => {
    setContaOrigem("");
    setContaDestino("");
    setNomeOrigem("");
    setNomeDestino("");
    setTipoDocumento("");
    setSitPagamento("");
    setDataInicio("");
    setDataFinal("");
    setFormArquivo("");
    clearCheckboxes("");
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
        <div className="checkbox-container">
          <h3>Informações no relatório</h3>
          <CheckboxRow
            label="Tipo de documento"
            state={selectedTipoDocumento}
            setState={setSelectedTipoDocumento}
          />
          <CheckboxRow
            label="Valor Bruto"
            state={selectedValorBruto}
            setState={setSelectedValorBruto}
          />
          <CheckboxRow
            label="Valor Líquido"
            state={selectedValorLiquido}
            setState={setSelectedValorLiquido}
          />
          <CheckboxRow
            label="Forma de Pagamento"
            state={selectedFormaPagamento}
            setState={setSelectedFormaPagamento}
          />
          <CheckboxRow
            label="Data de Vencimento"
            state={selectedDataVencimento}
            setState={setSelectedDataVencimento}
          />
          <CheckboxRow
            label="Data de Pagamento"
            state={selectedDataPagamento}
            setState={setSelectedDataPagamento}
          />
          <CheckboxRow
            label="Situação de Pagamento"
            state={selectedSitPagamento}
            setState={setSelectedSitPagamento}
          />
          <CheckboxRow
            label="Descrição"
            state={selectedDescricao}
            setState={setSelectedDescricao}
          />
        </div>
        <div>
          <PrimaryButton
            text="Gerar relatório"
            onClick={handleGenerateReport}
          />

          <SecondaryButton text="Limpar Filtros" onClick={clearFilters} />
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
