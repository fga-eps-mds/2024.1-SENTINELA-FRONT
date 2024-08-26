import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BenefitsCreate from "./index";
import { createBenefitsForm } from "../../../../Services/benefitsService";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

async function fillUpRequiredFields() {
  const selects = screen.getAllByRole("combobox");
  const statusSelect = selects.find((s) => s.id === "select-Status *");
  const irSelect = selects.find((s) => s.id === "select-Considerado no IR *");
  const descontoSelect = selects.find(
    (s) => s.id === "select-Desconto automático *"
  );

  await userEvent.click(statusSelect);
  await userEvent.click(screen.getByRole("option", { name: "Ativo" }));

  await userEvent.click(irSelect);
  await userEvent.click(screen.getByRole("option", { name: "Sim" }));

  await userEvent.click(descontoSelect);
  await userEvent.click(screen.getByRole("option", { name: "Sim" }));

  const nomeInput = await screen.findByLabelText("Nome fantasia *");
  const razaoInput = await screen.findByLabelText("Razão social *");

  await fireEvent.change(nomeInput, {
    target: { value: "Test Benefit" },
  });

  await fireEvent.change(razaoInput, {
    target: { value: "Test Razão Social" },
  });
}

function mockValidators() {
  // mocka funções de validação do service
  vi.mock("../../../../Utils/validators", () => {
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

describe("BenefitsCreate", () => {
  beforeEach(() => {
    // mocka o arquivo de services, hoje isso é utilizado apenas
    // para um caso de teste, porém pode ser útil no futuro que esteja no before each
    vi.mock("../../../../Services/benefitsService");
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(
      <Router>
        <BenefitsCreate />
      </Router>
    );

    expect(screen).toMatchSnapshot();
  });

  it("validates form correctly before submiting with only required fields", async () => {
    render(
      <Router>
        <BenefitsCreate />
      </Router>
    );

    // Tenta submeter o form sem preencher nada
    await userEvent.click(screen.getByText("CADASTRAR"));

    // Comportamento esperado é que..
    // Apareça uma mensagem solicitando o preenchimento de todos os campos obrigatórios e..
    expect(
      screen.getByText("Preencha todos os campos obrigatórios.")
    ).toBeInTheDocument();
    // que a função de criação em si não tenha sido chamada
    expect(createBenefitsForm).not.toHaveBeenCalled();
    // fecha a snackbar
    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    await fillUpRequiredFields();

    // Tenta submeter o form após preencher todos os campos obrigatórios
    await userEvent.click(screen.getByText("CADASTRAR"));
    // form deve ser submetido agora que todos os campos obrigatórios estão preenchidos
    expect(createBenefitsForm).toHaveBeenCalledTimes(1);
  });

  it("validates form correctly before submiting with non required fields", async () => {
    mockValidators();
    render(
      <Router>
        <BenefitsCreate />
      </Router>
    );

    await fillUpRequiredFields();

    // agora testando a validação de e-mail
    const emailInput = await screen.findByLabelText("E-mail");

    await fireEvent.change(emailInput, {
      // este endereço, como mockado no inicio do arquivo deve retornar um erro
      target: { value: "invalid-email!" },
    });

    // submete novamente com os campos obrigatórios preenchidos, porém com e-mail inválido
    await userEvent.click(screen.getByText("CADASTRAR"));

    // o comportamento esperado é que não haja solicitação de preenchimento dos campos obrigatórios como anteriormente,
    // mas sim de aviso de e-mail inválido
    expect(
      screen.getByText("O e-mail fornecido não é válido.")
    ).toBeInTheDocument();
    // novamente, é esperado que a função de submit do service não tenha sido chamada
    expect(createBenefitsForm).not.toHaveBeenCalled();
    // fecha a snackbar
    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    // agora preenchendo com um e-mail válido como no mock no inicio do arquivo
    await fireEvent.change(emailInput, {
      target: { value: "valid@email.com" },
    });

    // porém preenchendo um telefone inválido
    const celularInput = await screen.findByLabelText("Telefone/Celular");

    await fireEvent.change(celularInput, {
      target: { value: "123123" },
    });

    // submentendo novamente
    await userEvent.click(screen.getByText("CADASTRAR"));

    // a mensagem de e-mail inválido não aparece mais, dá lugar a de telefone
    expect(
      screen.getByText("O telefone fornecido não é válido.")
    ).toBeInTheDocument();
    // novamente, função de criação não deve ser chamada
    expect(createBenefitsForm).not.toHaveBeenCalled();
    // fecha a snackbar
    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    await fireEvent.change(celularInput, {
      target: { value: "61912341234" },
    });

    const siteInput = await screen.findByLabelText("Site");

    await fireEvent.change(siteInput, {
      target: { value: "sitemalformatado" },
    });

    // submentendo novamente
    await userEvent.click(screen.getByText("CADASTRAR"));

    // a mensagem de telefone inválido não aparece mais, dá lugar a de site
    expect(
      screen.getByText("O site fornecido não é válido.")
    ).toBeInTheDocument();
    // novamente, função de criação não deve ser chamada
    expect(createBenefitsForm).not.toHaveBeenCalled();
    // fecha a snackbar
    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    // preenche com site válido
    await fireEvent.change(siteInput, {
      target: { value: "https://valid.com" },
    });

    // submentendo novamente
    await userEvent.click(screen.getByText("CADASTRAR"));

    // form deve ser submetido agora que todos os campos obrigatórios estão preenchidos
    // e os não obrigatórios foram validados
    expect(createBenefitsForm).toHaveBeenCalledTimes(1);
  });
});
