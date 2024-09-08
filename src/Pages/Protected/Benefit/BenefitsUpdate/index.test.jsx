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
  deleteBenefitsFormById,
  updateBenefitsFormById,
} from "../../../../Services/benefitsService";

vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    somePermission: true,
  }),
  checkAction: () => true,
}));

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

describe("BenefitsUpdate", () => {
  beforeEach(() => {
    vi.mock("../../../../Services/benefitsService", () => {
      return {
        updateBenefitsFormById: vi.fn(),
        deleteBenefitsFormById: vi.fn(),
        getBenefitsFormById: () => ({
          nome: "nome teste",
          razaoSocial: "razao teste",
          descricao: "beneficio teste",
          descontoAut: "Sim",
          considerarIr: "Sim",
          statusConvenio: "Ativo",
          email: "",
          telefCelular: "",
          site: "",
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

  it("validates email correctly before submiting", async () => {
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

    expect(updateBenefitsFormById).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    await fireEvent.change(emailInput, {
      target: { value: "valid@email.com" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    await waitFor(() =>
      expect(updateBenefitsFormById).toHaveBeenCalledTimes(1)
    );
  });

  it("validates phone correctly before submiting", async () => {
    mockValidators();

    render(
      <Router>
        <BenefitsUpdate />
      </Router>
    );

    const phoneInput = await screen.findByLabelText("Telefone/Celular");

    await fireEvent.change(phoneInput, {
      target: { value: "123" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    expect(
      screen.getByText("O telefone fornecido não é válido.")
    ).toBeInTheDocument();

    expect(updateBenefitsFormById).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    await fireEvent.change(phoneInput, {
      target: { value: "61912341234" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    await waitFor(() =>
      expect(updateBenefitsFormById).toHaveBeenCalledTimes(1)
    );
  });

  it("validates site correctly before submitting", async () => {
    mockValidators();

    render(
      <Router>
        <BenefitsUpdate />
      </Router>
    );

    const siteInput = await screen.findByLabelText("Site");

    await fireEvent.change(siteInput, {
      target: { value: "sitemalformatado..com" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    expect(
      screen.getByText("O site fornecido não é válido.")
    ).toBeInTheDocument();

    expect(updateBenefitsFormById).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    await fireEvent.change(siteInput, {
      target: { value: "https://valid.com" },
    });
    await userEvent.click(screen.getByText("Salvar"));

    await waitFor(() =>
      expect(updateBenefitsFormById).toHaveBeenCalledTimes(1)
    );
  });

  it("deletes benefit correctly", async () => {
    render(
      <Router>
        <BenefitsUpdate />
      </Router>
    );

    await userEvent.click(screen.getByText("Deletar"));

    expect(
      screen.getByText("Deseja deletar o benefício do sistema?")
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText("EXCLUIR benefício"));

    await waitFor(() =>
      expect(deleteBenefitsFormById).toHaveBeenCalledTimes(1)
    );
  });
});
