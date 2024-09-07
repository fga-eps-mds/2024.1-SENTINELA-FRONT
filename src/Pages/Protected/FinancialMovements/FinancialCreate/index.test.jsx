import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import FinancialCreate from "./index";
import { createFinancialMovements } from "../../../../Services/FinancialMovementsService";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// Mock para o hook useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

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

// Função auxiliar para preencher campos obrigatórios
async function fillUpRequiredFields() {
  try {
    const contaOrigemSelect = await screen.findByLabelText("Conta origem *");
    const contaDestinoSelect = await screen.findByLabelText("Conta destino *");
    const nomeOrigemSelect = await screen.findByLabelText("Nome origem *");
    const nomeDestinoSelect = await screen.findByLabelText("Nome destino *");
    const tipoDocumentoSelect =
      await screen.findByLabelText("Tipo documento *");
    const dataVencimentoInput = await screen.findByLabelText(
      "Data de vencimento *"
    );
    const dataPagamentoInput =
      await screen.findByLabelText("Data de pagamento");

    // Simulando seleção de opções e preenchimento de campos
    await userEvent.selectOptions(contaOrigemSelect, "Fornecedor");
    await userEvent.selectOptions(contaDestinoSelect, "Sindicalizado");
    await userEvent.selectOptions(nomeOrigemSelect, "Nome Exemplo");
    await userEvent.selectOptions(nomeDestinoSelect, "Nome Exemplo");
    await userEvent.selectOptions(tipoDocumentoSelect, "AÇÃO JUDICIAL");

    await userEvent.type(screen.getByLabelText("Valor bruto *"), "1000");
    await userEvent.type(
      screen.getByLabelText("Descrição"),
      "Descrição de exemplo"
    );

    await userEvent.type(dataVencimentoInput, "10/10/2024");
    await userEvent.type(dataPagamentoInput, "01/10/2024");
  } catch (error) {
    console.error("Erro ao preencher campos:", error);
  }
}

describe("FinancialCreate Component", () => {
  let mockNavigate;

  beforeEach(() => {
    mockServices();
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));

    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate); // Configurando o mock do useNavigate

    render(
      <Router>
        <FinancialCreate />
      </Router>
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("render FinancialCreate page correctly", () => {
    expect(screen).toMatchSnapshot();
  });

  it("format CPF CNPJ correctly", async () => {
    const cpfCnpjInput = await screen.findByLabelText("CPF/CNPJ");

    // Testando a formatação do CPF
    await userEvent.type(cpfCnpjInput, "12345678901");
    expect(cpfCnpjInput.value).toBe("123.456.789-01");

    // Limpando o input e testando a formatação do CNPJ
    await userEvent.clear(cpfCnpjInput);
    await userEvent.type(cpfCnpjInput, "12345678000199");
    expect(cpfCnpjInput.value).toBe("12.345.678/0001-99");
  });

  it("should validate mandatory fields before submitting", async () => {
    await fillUpRequiredFields();

    // Submetendo após preencher todos os campos obrigatórios
    await userEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(createFinancialMovements).toHaveBeenCalledTimes(1);
    });
  });

  it("should alert if mandatory fields are not filled", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    // Tentando submeter sem preencher os campos obrigatórios
    await userEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Preencha todos os campos obrigatórios!"
      );
    });
  });
});
