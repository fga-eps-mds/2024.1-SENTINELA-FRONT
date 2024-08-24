import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BankAccountId from "./index";
import "@testing-library/jest-dom";
import { getBankAccount } from "../../../../Services/bankAccountService";

function mockServices() {
  vi.mock("../../../../Services/bankAccountService", () => ({
    getBankAccount: vi.fn(),
    updateBankAccount: vi.fn(),
    deleteBankAccount: vi.fn(),
  }));
}

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

  it("renders correctly", () => {
    render(
      <Router>
        <BankAccountId />
      </Router>
    );
    expect(screen).toMatchSnapshot();
  });

  //   it("updates name correctly", async () => {
  //     render(
  //       <Router>
  //         <BankAccountId />
  //       </Router>
  //     );

  //     // Verifique se o rótulo está presente
  //     await waitFor(() => {
  //       expect(screen.getByLabelText('Nome *')).toBeInTheDocument();
  //     });

  //     // Atualize o campo "Nome"
  //     const nameInput = screen.getByLabelText('Nome *');
  //     await userEvent.clear(nameInput);
  //     await userEvent.type(nameInput, 'Updated Name');

  //     await userEvent.click(screen.getByText('Salvar'));

  //     await waitFor(() =>
  //       expect(updateBankAccount).toHaveBeenCalledWith(expect.any(String), {
  //         name: 'Updated Name',
  //         pix: 'Test Pix',
  //         bank: 'Test Bank',
  //         accountType: 'Conta Corrente',
  //         accountNumber: '12345678901',
  //         dv: '1',
  //         status: 'Ativo',
  //         agency: '12345',
  //       })
  //     );
  //   });

  //   it("deletes bank account correctly", async () => {
  //     render(
  //       <Router>
  //         <BankAccountId />
  //       </Router>
  //     );

  //     await userEvent.click(screen.getByText((content, element) =>
  //       content.startsWith("Deletar") && element.tagName.toLowerCase() === 'button'
  //     ));

  //     expect(
  //       screen.getByText('Deseja deletar conta bancária do sistema?')
  //     ).toBeInTheDocument();

  //     await userEvent.click(screen.getByText('Excluir Conta bancária'));

  //     await waitFor(() =>
  //       expect(deleteBankAccount).toHaveBeenCalledWith(expect.any(String))
  //     );
  //   });
});
