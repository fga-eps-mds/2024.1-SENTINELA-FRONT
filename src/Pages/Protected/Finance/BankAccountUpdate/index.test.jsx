import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BankAccountId from "./index";
import "@testing-library/jest-dom";
import {
  getBankAccount,
  updateBankAccount,
} from "../../../../Services/bankAccountService";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../../../../Context/auth";

function mockServices() {
  vi.mock("../../../../Services/bankAccountService", () => ({
    getBankAccount: vi.fn(),
    updateBankAccount: vi.fn(),
    deleteBankAccount: vi.fn(),
  }));
}
vi.mock("../../../../Context/auth", () => ({
  useAuth: vi.fn(),
}));

describe("BankAccountId", () => {
  beforeEach(() => {
    mockServices();

    getBankAccount.mockResolvedValue({
      name: "Test Name",
      pix: "Test Pix",
      bank: "Test Bank",
      accountType: "Conta Corrente",
      accountNumber: "12345678901",
      dv: "1",
      status: "Ativo",
      agency: "12345",
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it("deve renderizar o componente quando o usuário está autenticado", () => {
    useAuth.mockReturnValue({ user: { id: "user123" } });

    render(
      <MemoryRouter>
        <BankAccountId />
      </MemoryRouter>
    );

    expect(screen.getByText("Visualização de benefícios")).toBeInTheDocument();
  });

  it("não deve renderizar o componente quando o usuário não está autenticado", () => {
    useAuth.mockReturnValue({ user: null });

    const { container } = render(
      <MemoryRouter>
        <BankAccountId />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders correctly", () => {
    render(
      <Router>
        <BankAccountId />
      </Router>
    );
    expect(screen).toMatchSnapshot();
  });

  it("should fetch and display bank account data", async () => {
    // Mock da resposta do serviço getBankAccount
    const bankAccountData = {
      name: "Conta Teste",
      pix: "123456789",
      bank: "Banco Teste",
      accountType: "Conta Corrente",
      accountNumber: "12345678901",
      dv: "1",
      status: "Ativo",
      agency: "12345",
    };

    getBankAccount.mockResolvedValue(bankAccountData);

    render(
      <MemoryRouter initialEntries={["/finance/bankAccount/123"]}>
        <Routes>
          <Route path="/finance/bankAccount/:id" element={<BankAccountId />} />
        </Routes>
      </MemoryRouter>
    );

    // expect(screen.getByText("Visualização de Conta Bancária")).toBeInTheDocument();

    // Espera a chamada do fetch
    await waitFor(() => {
      expect(getBankAccount).toHaveBeenCalledWith("123");
    });
  });
  it("should update bank account data", async () => {
    // Mock da resposta do serviço updateBankAccount
    const updatedBankAccountData = {
      name: "Conta Atualizada",
      pix: "987654321",
      bank: "Banco Atualizado",
      accountType: "Poupança",
      accountNumber: "98765432109",
      dv: "2",
      status: "Inativo",
      agency: "54321",
    };

    getBankAccount.mockResolvedValue(updatedBankAccountData);
    updateBankAccount.mockResolvedValue(updatedBankAccountData);
    render(
      <MemoryRouter initialEntries={["/finance/bankAccount/123"]}>
        <Routes>
          <Route path="/finance/bankAccount/:id" element={<BankAccountId />} />
        </Routes>
      </MemoryRouter>
    );

    // Espera a chamada do fetch
    await waitFor(() => {
      expect(getBankAccount).toHaveBeenCalledWith("123");
    });
  });
  it("should't update bank account data", async () => {
    // Mock da resposta do serviço updateBankAccount
    const updatedBankAccountData = {
      name: "",
      pix: "987654321",
      bank: "Banco Atualizado",
      accountType: "Poupança",
      accountNumber: "98765432109",
      dv: "2",
      status: "Inativo",
      agency: "54321",
    };

    getBankAccount.mockResolvedValue(updatedBankAccountData);
    updateBankAccount.mockResolvedValue(updatedBankAccountData);
    render(
      <MemoryRouter initialEntries={["/finance/bankAccount/123"]}>
        <Routes>
          <Route path="/finance/bankAccount/:id" element={<BankAccountId />} />
        </Routes>
      </MemoryRouter>
    );

    // Espera a chamada do fetch
    await waitFor(() => {
      expect(getBankAccount).toHaveBeenCalledWith("123");
    });
  });
});
