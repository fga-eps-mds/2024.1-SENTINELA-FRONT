import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateSupplier from "./index";
import { createSupplierForm } from "../../../Services/supplierService";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

async function fillUpRequiredFields() {
  const nomeInput = screen.getByLabelText("Nome/Razão Social *");
  await fireEvent.change(nomeInput, {
    target: { value: "Fornecedor Teste" },
  });
}

function mockValidators() {
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

describe("CreateSupplier", () => {
  beforeEach(() => {
    vi.mock("../../../Services/supplierService", () => ({
      createSupplierForm: vi.fn().mockResolvedValue(null), // Mock que resolve sem erro
    }));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(
      <Router>
        <CreateSupplier />
      </Router>
    );

    expect(screen).toMatchSnapshot();
  });

  it("validates form correctly before submitting with only required fields", async () => {
    render(
      <Router>
        <CreateSupplier />
      </Router>
    );

    // Tenta submeter o form sem preencher nada
    await userEvent.click(screen.getByText("CADASTRAR"));

    // Verifica se aparece a mensagem de erro
    expect(
      screen.getByText(
        "Certifique-se de que todos os campos obrigatórios estão preenchidos"
      )
    ).toBeInTheDocument();
    // Verifica se a função de criação não foi chamada
    expect(createSupplierForm).not.toHaveBeenCalled();

    // Preenche os campos obrigatórios
    await fillUpRequiredFields();

    // Tenta submeter o form após preencher todos os campos obrigatórios
    await userEvent.click(screen.getByText("CADASTRAR"));
    // Verifica se a função de criação foi chamada
    expect(createSupplierForm).toHaveBeenCalledTimes(1);
  });

  it("validates form correctly with non-required fields", async () => {
    mockValidators();
    render(
      <Router>
        <CreateSupplier />
      </Router>
    );

    await fillUpRequiredFields();

    // Testando a validação de e-mail
    const emailInput = screen.getByLabelText("E-mail");
    await fireEvent.change(emailInput, { target: { value: "invalid-email!" } });

    await userEvent.click(screen.getByText("CADASTRAR"));
    expect(
      screen.getByText("O e-mail fornecido não é válido.")
    ).toBeInTheDocument();
    expect(createSupplierForm).not.toHaveBeenCalled();

    await fireEvent.change(emailInput, {
      target: { value: "valid@email.com" },
    });

    // Testando a validação de telefone
    const celularInput = screen.getByLabelText("Celular");
    await fireEvent.change(celularInput, { target: { value: "123" } });

    await userEvent.click(screen.getByText("CADASTRAR"));
    expect(
      screen.getByText("O celular fornecido não é válido.")
    ).toBeInTheDocument();
    expect(createSupplierForm).not.toHaveBeenCalled();

    const telefoneInput = screen.getAllByLabelText("Telefone");
    await fireEvent.change(telefoneInput, { target: { value: "123" } });

    await userEvent.click(screen.getByText("CADASTRAR"));
    expect(
      screen.getByText("O telefone fornecido não e válido.")
    ).toBeInTheDocument();
    expect(createSupplierForm).not.toHaveBeenCalled();
  });
});
