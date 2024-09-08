import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FinancialUpdate from "./index";
import {
  deleteFinancialMovementsById,
  updateFinancialMovementsById,
} from "../../../../Services/FinancialMovementsService";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import "@testing-library/jest-dom";

vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    somePermission: true,
  }),
  checkAction: () => true,
}));

function mockServices() {
  vi.mock("../../../../Services/FinancialMovementsService", () => ({
    getFinancialMovementsById: vi.fn(() =>
      Promise.resolve({
        contaOrigem: "Fornecedor",
        contaDestino: "Sindicalizado",
        nomeOrigem: "Nome Exemplo",
        nomeDestino: "Nome Exemplo",
        tipoDocumento: "AÇÃO JUDICIAL",
        cpFCnpj: "",
        valorBruto: "1000",
        valorLiquido: "",
        acrescimo: "",
        desconto: "",
        formadePagamento: "PIX",
        datadeVencimento: dayjs("2024-01-01"),
        datadePagamento: dayjs("2024-02-01"),
        descricao: "Descrição de exemplo",
      })
    ),
    updateFinancialMovementsById: vi.fn(),
    deleteFinancialMovementsById: vi.fn(),
  }));

  vi.mock("../../../../Services/userService", () => ({
    getUsers: vi.fn(() => Promise.resolve([{ name: "Nome Exemplo" }])),
  }));

  vi.mock("../../../../Services/supplierService", () => ({
    getSupplierForm: vi.fn(() => Promise.resolve([{ nome: "Nome Exemplo" }])),
  }));
}

describe("FinancialUpdate", () => {
  beforeEach(() => {
    mockServices();
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders the FinancialUpdate page correctly", () => {
    render(
      <Router>
        <FinancialUpdate />
      </Router>
    );

    expect(screen).toMatchSnapshot();
  });

  it("should handle delete button click", async () => {
    render(
      <Router>
        <FinancialUpdate />
      </Router>
    );

    // Open delete modal
    await userEvent.click(screen.getByText("Deletar"));

    // Click the confirm delete button
    await userEvent.click(screen.getByText("EXCLUIR MOVIMENTAÇÃO"));

    await waitFor(() => {
      expect(deleteFinancialMovementsById).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Movimentação Deletada")).toBeInTheDocument();
    });
  });

  it("should format CPF/CNPJ correctly", async () => {
    render(
      <Router>
        <FinancialUpdate />
      </Router>
    );

    const cpfCnpjInput = screen.getByLabelText("CPF/CNPJ");

    await userEvent.type(cpfCnpjInput, "12345678901");
    expect(cpfCnpjInput.value).toBe("123.456.789-01");

    await userEvent.clear(cpfCnpjInput);
    await userEvent.type(cpfCnpjInput, "12345678000199");
    expect(cpfCnpjInput.value).toBe("12.345.678/0001-99");
  });

  it("should handle save button click and call updateFinancialMovementsById", async () => {
    render(
      <Router>
        <FinancialUpdate />
      </Router>
    );

    await userEvent.click(screen.getByText("Salvar"));

    await waitFor(() => {
      expect(updateFinancialMovementsById).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Alterações Salvas")).toBeInTheDocument();
    });
  });

  it("should render labels correctly", () => {
    render(
      <Router>
        <FinancialUpdate />
      </Router>
    );

    screen.debug(); // Verifique o HTML renderizado
  });

  it("should correctly update fields when changing inputs", async () => {
    render(
      <Router>
        <FinancialUpdate />
      </Router>
    );

    const descricaoInput = screen.getByLabelText("Descrição");

    await userEvent.clear(descricaoInput);
    await userEvent.type(descricaoInput, "Descrição alterada");
    expect(descricaoInput.value).toBe("Descrição alterada");
  });
});
