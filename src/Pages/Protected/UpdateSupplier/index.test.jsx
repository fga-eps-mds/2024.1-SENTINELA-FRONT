import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BenefitsUpdate from "./index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  deleteSupplierFormById,
  updateSupplierFormById,
} from "../../../Services/supplierService";

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
      isValidCelular: (celular) =>
        !celular || celular === "(61) 91234-1234"
          ? { isValid: true }
          : {
              isValid: false,
              message: "O telefone fornecido não é válido.",
            },
      isValidSite: (site) =>
        !site || site === "https://valid.com"
          ? { isValid: true }
          : {
              isValid: false,
              message: "O site fornecido não é válido.",
            },
    };
  });
}

describe("SupplierUpdate", () => {
  beforeEach(() => {
    vi.mock("../../../Services/supplierService", () => {
      return {
        updateSupplierFormById: vi.fn(),
        deleteSupplierFormById: vi.fn(),
        getSupplierFormById: () => ({
          nome: "nome teste",
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
        <BenefitsUpdate />
      </Router>
    );
    expect(screen).toMatchSnapshot();
  });

  it("validates form correctly before submiting", async () => {
    mockValidators();

    render(
      <Router>
        <BenefitsUpdate />
      </Router>
    );

    const emailInput = await screen.findByLabelText("E-mail");

    await fireEvent.change(emailInput, {
      target: { value: "invalid-email" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    expect(
      screen.getByText("O e-mail fornecido não é válido.")
    ).toBeInTheDocument();

    expect(updateSupplierFormById).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    await fireEvent.change(emailInput, {
      target: { value: "valid@email.com" },
    });

    const phoneInput = await screen.findByLabelText("Telefone/Celular");

    await fireEvent.change(phoneInput, {
      target: { value: "123" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    expect(
      screen.getByText("O telefone fornecido não é válido.")
    ).toBeInTheDocument();

    expect(updateSupplierFormById).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    await fireEvent.change(phoneInput, {
      target: { value: "61912341234" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    await waitFor(() =>
      expect(updateSupplierFormById).toHaveBeenCalledTimes(1)
    );
  });

  it("deletes supplier correctly", async () => {
    render(
      <Router>
        <BenefitsUpdate />
      </Router>
    );

    await userEvent.click(screen.getByText("Deletar"));

    expect(
      screen.getByText("Deseja deletar o fornecedor do sistema?")
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText("EXCLUIR FORNECEDOR"));

    await waitFor(() =>
      expect(deleteSupplierFormById).toHaveBeenCalledTimes(1)
    );
  });
});
