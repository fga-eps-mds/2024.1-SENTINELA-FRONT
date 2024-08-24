import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RolesCreatePage from "./index";
import { createRole } from "../../../../Services/RoleService/roleService";
import "@testing-library/jest-dom";

// Mockando o serviço createRole
vi.mock("../../../../Services/RoleService/roleService", () => ({
  createRole: vi.fn(),
}));

describe("RolesCreatePage", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", () => {
    render(
      <Router>
        <RolesCreatePage />
      </Router>
    );

    expect(screen.getByLabelText("Nome do Perfil*")).toBeInTheDocument();
    expect(screen.getByText("Financeiro")).toBeInTheDocument();
    expect(screen.getByText("Benefícios")).toBeInTheDocument();
    expect(screen.getByText("Usuarios")).toBeInTheDocument();
  });

  it("displays error when profile name is empty and submit is clicked", () => {
    render(
      <Router>
        <RolesCreatePage />
      </Router>
    );

    fireEvent.click(screen.getByText("Cadastrar"));

    expect(
      screen.getByText("Nome é um campo obrigatório!")
    ).toBeInTheDocument();
  });

  it("toggles checkboxes correctly", () => {
    render(
      <Router>
        <RolesCreatePage />
      </Router>
    );

    // Captura a linha correspondente ao módulo "Financeiro"
    const financeRow = screen.getByText("Financeiro").closest("div");

    // Captura as checkboxes dentro dessa linha
    const checkboxes = financeRow.querySelectorAll('input[type="checkbox"]');

    const checkboxCriarFinanceiro = checkboxes[0]; // Primeira checkbox (Criar)
    const checkboxVisualizarFinanceiro = checkboxes[1]; // Segunda checkbox (Visualizar)
    const checkboxEditarFinanceiro = checkboxes[2];
    const checkboxDeletarFinanceiro = checkboxes[3];
    // Inicialmente desmarcadas
    expect(checkboxCriarFinanceiro).not.toBeChecked();
    expect(checkboxVisualizarFinanceiro).not.toBeChecked();
    expect(checkboxEditarFinanceiro).not.toBeChecked();
    expect(checkboxDeletarFinanceiro).not.toBeChecked();

    // Clicar nas checkboxes
    fireEvent.click(checkboxCriarFinanceiro);
    fireEvent.click(checkboxVisualizarFinanceiro);
    fireEvent.click(checkboxEditarFinanceiro);
    fireEvent.click(checkboxDeletarFinanceiro);

    // Espera que estejam marcadas
    expect(checkboxCriarFinanceiro).toBeChecked();
    expect(checkboxVisualizarFinanceiro).toBeChecked();
    expect(checkboxEditarFinanceiro).toBeChecked();
    expect(checkboxDeletarFinanceiro).toBeChecked();

    // Clicar novamente para desmarcar
    fireEvent.click(checkboxCriarFinanceiro);
    fireEvent.click(checkboxVisualizarFinanceiro);
    fireEvent.click(checkboxEditarFinanceiro);
    fireEvent.click(checkboxDeletarFinanceiro);

    // Espera que estejam desmarcadas
    expect(checkboxCriarFinanceiro).not.toBeChecked();
    expect(checkboxVisualizarFinanceiro).not.toBeChecked();
    expect(checkboxEditarFinanceiro).not.toBeChecked();
    expect(checkboxDeletarFinanceiro).not.toBeChecked();
  });

  it("submits the form with correct data", async () => {
    render(
      <Router>
        <RolesCreatePage />
      </Router>
    );

    // Preencher o nome do perfil
    fireEvent.change(screen.getByLabelText("Nome do Perfil*"), {
      target: { value: "Admin" },
    });

    // Selecionar permissões
    const financeRow = screen.getByText("Financeiro").closest("div");
    const financeCheckboxes = financeRow.querySelectorAll(
      'input[type="checkbox"]'
    );

    // Simula o clique na primeira checkbox (Criar)
    fireEvent.click(financeCheckboxes[0]);

    // Mock da resposta da API
    createRole.mockResolvedValue({ status: 201 });

    // Submeter o formulário
    fireEvent.click(screen.getByText("Cadastrar"));

    // Verifica se a função createRole foi chamada com os dados corretos
    expect(createRole).toHaveBeenCalledWith({
      name: "Admin",
      permissions: [
        { module: "finance", access: ["create"] },
        { module: "benefits", access: [] },
        { module: "users", access: [] },
      ],
    });

    // Verifica se o modal aparece
    expect(
      await screen.findByText("Cadastro de usuário concluído")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("OK"));

    // Verifica se a navegação para "/perfis" ocorre
    await waitFor(() => {
      expect(window.location.pathname).toBe("/perfis");
    });
  });
});
