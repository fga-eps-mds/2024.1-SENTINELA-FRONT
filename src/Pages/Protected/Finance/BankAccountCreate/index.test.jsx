import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";

import BankAccountCreate from "./index";
import { useAuth } from "../../../../Context/auth";

vi.mock("../../../../Context/auth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../../../Services/bankAccountService", () => ({
  createBankAccount: vi.fn(),
}));

describe("BankAccountCreate Component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form correctly when user is authenticated", () => {
    useAuth.mockReturnValue({
      user: { id: 1, name: "Test User" },
    });

    render(
      <Router>
        <BankAccountCreate />
      </Router>
    );

    expect(screen.getByText("Cadastro de Conta Bancária")).toBeInTheDocument();
  });

  it("does not render the form when user is not authenticated", () => {
    useAuth.mockReturnValue({
      user: null,
    });

    render(
      <Router>
        <BankAccountCreate />
      </Router>
    );

    expect(screen.queryByText("Cadastro de Conta Bancária")).toBeNull();
  });

  it("shows error message when required fields are missing", () => {
    useAuth.mockReturnValue({
      user: { id: 1, name: "Test User" },
    });

    render(
      <Router>
        <BankAccountCreate />
      </Router>
    );

    fireEvent.click(screen.getByText("Cadastrar Conta"));

    expect(
      screen.getByText(
        "Certifique-se de que todos os campos obrigatórios estão preenchidos"
      )
    ).toBeInTheDocument();
  });

  // it("shows unique error message if name is already registered", async () => {
  //   useAuth.mockReturnValue({
  //     user: { id: 1, name: "Test User" },
  //   });

  //   createBankAccount.mockResolvedValue({
  //     status: 409,
  //     data: { error: "Nome já cadastrado" },
  //   });

  //   render(
  //     <Router>
  //       <BankAccountCreate />
  //     </Router>
  //   );

  //   fireEvent.change(screen.getByLabelText("Nome *"), { target: { value: "Conta Teste" } });
  //   fireEvent.click(screen.getByText("Cadastrar Conta"));

  //   expect(await screen.findByText("Nome já cadastrado")).toBeInTheDocument();
  // });

  // it("navigates to list page after successful creation", async () => {
  //   useAuth.mockReturnValue({
  //     user: { id: 1, name: "Test User" },
  //   });

  //   createBankAccount.mockResolvedValue({
  //     status: 201,
  //   });

  //   const navigate = vi.fn();
  //   render(
  //     <Router>
  //       <BankAccountCreate navigate={navigate} />
  //     </Router>
  //   );

  //   fireEvent.change(screen.getByLabelText("Nome *"), { target: { value: "Conta Teste" } });
  //   fireEvent.click(screen.getByText("Cadastrar Conta"));

  //   await waitFor(() => {
  //     expect(screen.getByText("Cadastro concluído")).toBeInTheDocument();
  //   });
  //   expect(navigate).toHaveBeenCalledWith("/finance/list");
  // });

  it("applies masks correctly", () => {
    useAuth.mockReturnValue({
      user: { id: 1, name: "Test User" },
    });

    render(
      <Router>
        <BankAccountCreate />
      </Router>
    );

    const agenciaInput = screen.getByLabelText("Agência");
    const numeroContaInput = screen.getByLabelText("Número da conta");
    const dvInput = screen.getByLabelText("DV");

    fireEvent.change(agenciaInput, { target: { value: "123456" } });
    expect(agenciaInput.value).toBe("12345");

    fireEvent.change(numeroContaInput, { target: { value: "123456789012" } });
    expect(numeroContaInput.value).toBe("12345678901");

    fireEvent.change(dvInput, { target: { value: "123" } });
    expect(dvInput.value).toBe("1");
  });
});
