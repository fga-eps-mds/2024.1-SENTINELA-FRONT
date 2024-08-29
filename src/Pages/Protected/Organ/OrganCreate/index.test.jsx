import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import OrganCreate from "./index";
import { useAuth } from "../../../../Context/auth";
import { createOrgan } from "../../../../Services/organService";
import userEvent from "@testing-library/user-event";

vi.mock("../../../../Context/auth", () => ({
  useAuth: vi.fn(),
}));

async function fillUpRequiredFields() {
  const nomeOrgao = await screen.findByLabelText(/Nome do órgão*/i);
  const nomeLotacao = await screen.findByLabelText(/Lotação*/i);
  const nomeSigla = await screen.findByLabelText(/Sigla*/i);

  fireEvent.change(nomeOrgao, {
    target: { value: "Órgão-Teste" },
  });
  fireEvent.change(nomeLotacao, {
    target: { value: "Lot-teste" },
  });
  fireEvent.change(nomeSigla, {
    target: { value: "Sigla-Teste" },
  });
}

describe("OrganCreate Component", () => {
  beforeEach(() => {
    vi.mock("../../../../Services/organService");
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form correctly when user is authenticated", async () => {
    useAuth.mockReturnValue({
      user: { id: 1, name: "Test User" },
    });

    render(
      <Router>
        <OrganCreate />
      </Router>
    );

    expect(screen).toMatchSnapshot();
    expect(screen.getByText("Cadastro de Órgãos")).toBeInTheDocument();
    expect(screen.getByText("Dados do Órgão")).toBeInTheDocument();
    expect(screen.getByText("Dados de Lotações")).toBeInTheDocument();
  });

  it("validates form correctly before submiting with only required fields", async () => {
    useAuth.mockReturnValue({
      organ: { nomeOrgao: "", lotacao: "", sigla: "" },
    });

    render(
      <Router>
        <OrganCreate />
      </Router>
    );

    fireEvent.click(screen.getByText("Cadastrar"));

    expect(
      screen.getByText("Preencha todos os campos obrigatórios.")
    ).toBeInTheDocument();

    expect(createOrgan).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    const nomeOrgao = await screen.findByLabelText(/Nome do órgão*/i);
    fireEvent.change(nomeOrgao, {
      target: { value: "Orgao 1" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));
    expect(createOrgan).not.toHaveBeenCalled();

    const nomeLotacao = await screen.findByLabelText(/Lotação*/i);
    fireEvent.change(nomeLotacao, {
      target: { value: "LOT1" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));
    expect(createOrgan).not.toHaveBeenCalled();

    await fillUpRequiredFields();
    fireEvent.click(screen.getByText("Cadastrar"));
    expect(createOrgan).toHaveBeenCalledTimes(1);
  });

  it("validates form correctly before submiting with non required fields", async () => {
    render(
      <Router>
        <OrganCreate />
      </Router>
    );
    await fillUpRequiredFields();

    const addIcon = screen.getByTestId("AddCircleOutlineIcon"); // Certifique-se de que o ícone tem um data-testid
    fireEvent.click(addIcon);

    const newLotacaoField = screen.getByLabelText("Nome");
    const newSiglaField = screen.getByLabelText("Sigla");
    expect(newLotacaoField).toBeInTheDocument();
    expect(newSiglaField).toBeInTheDocument();

    fireEvent.change(newLotacaoField, { target: { value: "Nova Lotação" } });
    fireEvent.change(newSiglaField, { target: { value: "NL" } });

    expect(newLotacaoField.value).toBe("Nova Lotação");
    expect(newSiglaField.value).toBe("NL");

    const confirmButton = screen.getByText("Confirmar Lotação");
    fireEvent.click(confirmButton);

    expect(screen.getByText("Lotação Confirmada 1")).toBeInTheDocument();
  });

  it("validates and leave for list page when press confirm", async () => {
    render(
      <Router>
        <OrganCreate />
      </Router>
    );

    await fillUpRequiredFields();

    fireEvent.click(screen.getByText("Cadastrar"));

    waitFor(() => {
      expect(screen.getByText("Órgão cadastrado com sucesso!"));
      fireEvent.click(screen.getByText("OK"));
      expect(window.location.pathname).toBe("/organ/list");
    });
  });
});
