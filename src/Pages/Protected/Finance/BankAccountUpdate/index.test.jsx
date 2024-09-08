import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BankAccountId from "./index";
import "@testing-library/jest-dom";
import {
  getBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from "../../../../Services/bankAccountService";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../../../../Context/auth";

vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    somePermission: true,
  }),
  checkAction: () => true,
}));

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

    expect(
      screen.getByText("Visualização de Conta Bancária")
    ).toBeInTheDocument();
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
  it("should validate Agencia", async () => {
    useAuth.mockReturnValue({ user: { id: "user123" } });

    render(
      <MemoryRouter>
        <BankAccountId />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Visualização de Conta Bancária")
    ).toBeInTheDocument();

    const agenciaInput = await screen.findByLabelText("Agência");

    await fireEvent.change(agenciaInput, {
      target: { value: "12345678" },
    });

    expect(agenciaInput.value).toBe("12345");
  });
  it("should validate dv", async () => {
    useAuth.mockReturnValue({ user: { id: "user123" } });

    render(
      <MemoryRouter>
        <BankAccountId />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Visualização de Conta Bancária")
    ).toBeInTheDocument();

    const dvInput = await screen.findByLabelText("DV");

    await fireEvent.change(dvInput, {
      target: { value: "12345678" },
    });

    expect(dvInput.value).toBe("1");
  });
  it("should validate accountNumber", async () => {
    useAuth.mockReturnValue({ user: { id: "user123" } });

    render(
      <MemoryRouter>
        <BankAccountId />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Visualização de Conta Bancária")
    ).toBeInTheDocument();

    const accountNumberInput = await screen.findByLabelText("Número da conta");

    await fireEvent.change(accountNumberInput, {
      target: { value: "012345678912" },
    });

    expect(accountNumberInput.value).toBe("01234567891");
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
  it("should delete bank account", async () => {
    useAuth.mockReturnValue({ user: { id: "user123" } });

    render(
      <MemoryRouter>
        <BankAccountId />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Deletar"));
    fireEvent.click(screen.getByText("Excluir Conta bancária"));
    await waitFor(() => {
      expect(deleteBankAccount).toHaveBeenCalled();
    });
  });
});
