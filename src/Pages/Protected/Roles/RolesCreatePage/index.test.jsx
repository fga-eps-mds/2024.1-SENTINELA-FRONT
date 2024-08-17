import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RolesCreatePage from "./index";

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

    // Inicialmente desmarcadas
    expect(checkboxCriarFinanceiro).not.toBeChecked();
    expect(checkboxVisualizarFinanceiro).not.toBeChecked();

    // Clicar nas checkboxes
    fireEvent.click(checkboxCriarFinanceiro);
    fireEvent.click(checkboxVisualizarFinanceiro);

    // Espera que estejam marcadas
    expect(checkboxCriarFinanceiro).toBeChecked();
    expect(checkboxVisualizarFinanceiro).toBeChecked();

    // Clicar novamente para desmarcar
    fireEvent.click(checkboxCriarFinanceiro);
    fireEvent.click(checkboxVisualizarFinanceiro);

    // Espera que estejam desmarcadas
    expect(checkboxCriarFinanceiro).not.toBeChecked();
    expect(checkboxVisualizarFinanceiro).not.toBeChecked();
  });
});
