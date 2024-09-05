import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FinancialCreate from "./index";
import { createFinancialMovements } from "../../../../Services/FinancialMovementsService";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// Função auxiliar para preencher campos obrigatórios
async function fillUpRequiredFields() {
  const selects = screen.getAllByRole("combobox");

  const contaOrigemSelect = selects.find(
    (s) => s.id === "select-Conta origem *"
  );
  const contaDestinoSelect = selects.find(
    (s) => s.id === "select-Conta destino *"
  );
  const nomeOrigemSelect = selects.find((s) => s.id === "select-Nome origem *");
  const nomeDestinoSelect = selects.find(
    (s) => s.id === "select-Nome Destino *"
  );
  const tipoDocumentoSelect = selects.find(
    (s) => s.id === "select-Tipo documento *"
  );
  const pagamentoSelect = selects.find(
    (s) => s.id === "select-Forma de Pagamento *"
  );
  const dataVencimentoInput = screen.getByLabelText("Data de vencimento *");
  const dataPagamentoInput = screen.getByLabelText("Data de pagamento");

  await userEvent.click(contaOrigemSelect);
  await userEvent.click(screen.getByRole("option", { name: "Fornecedor" }));

  await userEvent.click(contaDestinoSelect);
  await userEvent.click(screen.getByRole("option", { name: "Sindicalizado" }));

  await userEvent.click(nomeOrigemSelect);
  await userEvent.click(screen.getByRole("option", { name: "Nome Exemplo" }));

  await userEvent.click(nomeDestinoSelect);
  await userEvent.click(screen.getByRole("option", { name: "Nome Exemplo" }));

  await userEvent.click(tipoDocumentoSelect);
  await userEvent.click(screen.getByRole("option", { name: "AÇÃO JUDICIAL" }));

  await userEvent.click(pagamentoSelect);
  await userEvent.click(screen.getByRole("option", { name: "PIX" }));

  await userEvent.type(screen.getByLabelText("Valor Bruto *"), "1000");
  await userEvent.type(
    screen.getByLabelText("Descrição"),
    "Descrição de exemplo"
  );

  // Preenchendo datas de exemplo
  await userEvent.type(dataVencimentoInput, "01/01/2024");
  await userEvent.type(dataPagamentoInput, "01/02/2024");
}

// Mocking the services
function mockServices() {
  vi.mock("../../../../Services/FinancialMovementsService", () => ({
    createFinancialMovements: vi.fn(),
  }));

  vi.mock("../../../../Services/userService", () => ({
    getUsers: vi.fn(() => Promise.resolve([{ name: "Nome Exemplo" }])),
  }));

  vi.mock("../../../../Services/supplierService", () => ({
    getSupplierForm: vi.fn(() => Promise.resolve([{ nome: "Nome Exemplo" }])),
  }));
}

describe("FinancialCreate", () => {
  beforeEach(() => {
    mockServices();
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders the FinancialCreate page correctly", () => {
    render(
      <Router>
        <FinancialCreate />
      </Router>
    );

    expect(screen).toMatchSnapshot();
  });

  it("formats CPF and CNPJ correctly", async () => {
    render(
      <Router>
        <FinancialCreate />
      </Router>
    );

    // Localiza o input de CPF/CNPJ (substitua o identificador conforme necessário)
    const cpfCnpjInput = screen.getByLabelText("CPF/CNPJ");

    // Testando a formatação do CPF
    await userEvent.type(cpfCnpjInput, "12345678901");
    expect(cpfCnpjInput.value).toBe("123.456.789-01");

    // Limpando o input e testando a formatação do CNPJ
    await userEvent.clear(cpfCnpjInput);
    await userEvent.type(cpfCnpjInput, "12345678000199");
    expect(cpfCnpjInput.value).toBe("12.345.678/0001-99");
  });

  it("validates required fields before submitting", async () => {
    render(
      <Router>
        <FinancialCreate />
      </Router>
    );

    // Preenche os campos obrigatórios
    await fillUpRequiredFields();

    // Submetendo após preencher todos os campos obrigatórios
    await userEvent.click(screen.getByText("Cadastrar"));

    // Espera que a função de criação seja chamada após preencher os campos obrigatórios
    expect(createFinancialMovements).toHaveBeenCalledTimes(1);
  });

  it("navigates to the list page after successful submission", async () => {
    render(
      <Router>
        <FinancialCreate />
      </Router>
    );

    await fillUpRequiredFields();
    vi.mocked(createFinancialMovements).mockResolvedValueOnce(null); // Simula uma resposta de sucesso

    await userEvent.click(screen.getByText("Cadastrar"));

    // Espera que a navegação para a página de lista ocorra após o sucesso
    expect(
      await screen.findByText("Cadastro de movimentação concluído")
    ).toBeInTheDocument();
  });
});
