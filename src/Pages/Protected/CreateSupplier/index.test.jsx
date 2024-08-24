import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateSupplier from "./index";
import { createSupplierForm } from "../../../Services/supplierService";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

async function fillUpRequiredFields() {
  const nomeInput = await screen.findByLabelText("Nome/Razão Social *");
  await fireEvent.change(nomeInput, {
    target: { value: "Test Supplier" },
  });
}

describe("CreateSupplier", () => {
  beforeEach(() => {
    vi.mock("../../../Services/supplierService");
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

    await userEvent.click(screen.getByRole("button", { name: /close/i })); // fecha o alert

    // Preenche os campos obrigatórios
    await fillUpRequiredFields();

    // Tenta submeter o form após preencher todos os campos obrigatórios
    await userEvent.click(screen.getByText("CADASTRAR"));
    // Verifica se a função de criação foi chamada
    expect(createSupplierForm).toHaveBeenCalledTimes(1);
  });

  it("validates form correctly with non-required fields", async () => {
    render(
      <Router>
        <CreateSupplier />
      </Router>
    );

    await fillUpRequiredFields();

    // Testando a validação de e-mail
    const emailInput = await screen.findByLabelText(/e-mail/i);

    await fireEvent.change(emailInput, {
      // este endereço, como mockado no inicio do arquivo deve retornar um erro
      target: { value: "invalid-email!" },
    });
    await userEvent.click(screen.getByText("CADASTRAR"));
    expect(
      await screen.findByText("O e-mail fornecido não é válido.")
    ).toBeInTheDocument();
    expect(createSupplierForm).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    await fireEvent.change(emailInput, {
      target: { value: "valid@email.com" },
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /close/i })
      ).not.toBeInTheDocument();
    });

    // Testando a validação de telefone
    const celularInput = await screen.findByLabelText(/Celular/i);
    await fireEvent.change(celularInput, { target: { value: "123" } });

    await userEvent.click(screen.getByText("CADASTRAR"));
    expect(
      await screen.findByText("O celular fornecido não é válido.")
    ).toBeInTheDocument();
    expect(createSupplierForm).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i })); // fecha o alert
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /close/i })
      ).not.toBeInTheDocument();
    });

    await fireEvent.change(celularInput, { target: { value: "61984814046" } });

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /close/i })
      ).not.toBeInTheDocument();
    });

    const telefoneInput = await screen.findByLabelText(/Telefone/i);
    await fireEvent.change(telefoneInput, { target: { value: "123" } });

    await userEvent.click(screen.getByText("CADASTRAR"));
    expect(
      await screen.findByText("O telefone fornecido não é válido.")
    ).toBeInTheDocument();
    expect(createSupplierForm).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i })); // fecha o alert
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /close/i })
      ).not.toBeInTheDocument();
    });

    await fireEvent.change(telefoneInput, { target: { value: "6133338824" } });

    await userEvent.click(screen.getByText("CADASTRAR"));
    expect(createSupplierForm).toHaveBeenCalledTimes(1);
  });
});
