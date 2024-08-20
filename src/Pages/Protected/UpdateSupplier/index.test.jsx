import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UpdateSupplier from ".";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { updateSupplierFormById } from "../../../Services/supplierService";

function mockValidators() {
  // mocka funções de validação do service
  vi.mock("../../../Utils/validators", () => {
    return {
      isValidEmail: (email) =>
        !email || email === "valid@email.com"
          ? { isValid: true }
          : {
              isValid: false,
              message: "O e-mail fornecido não é válido.",
            },
    };
  });
}

describe("UpdateSupplier", () => {
  beforeEach(() => {
    vi.mock("../../../Services/supplierService", () => {
      return {
        updateSupplierFormById: vi.fn(),
        deleteSupplierFormById: vi.fn(),
        getSupplierFormById: () => ({
          nome: "teste",
          tipoPessoa: "Jurídica",
          email: "",
          statusFornecedor: "Ativo",
          naturezaTransacao: "Receita",
          celular: "",
          telefone: "",
        }),
      };
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <Router>
        <UpdateSupplier />
      </Router>
    );
    expect(screen).toMatchSnapshot();
  });

  it.only("validators form correctly before submiting", async () => {
    mockValidators();

    render(
      <Router>
        <UpdateSupplier />
      </Router>
    );

    const emailInput = await screen.findByLabelText("E-mail");
    fireEvent.change(emailInput, {
      target: { value: "invalid-email!" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    expect(
      screen.getByText("O e-mail fornecido não é válido.")
    ).toBeInTheDocument();

    expect(updateSupplierFormById).not.toHaveBeenCalled();

    //await userEvent.click(screen.getByRole("button", {name: /close/i }));

    fireEvent.change(emailInput, {
      target: { value: "valid@gmail.com" },
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /close/i })
      ).not.toBeInTheDocument();
    });

    const cellInput = await screen.findByLabelText("Celular");
    fireEvent.change(cellInput, {
      target: { value: "123" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    expect(
      screen.getByText("O celular fornecido não é válido.")
    ).toBeInTheDocument();

    expect(updateSupplierFormById).not.toHaveBeenCalled();
  });
});
