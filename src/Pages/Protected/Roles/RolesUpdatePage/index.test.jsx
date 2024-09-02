import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RolesUpdatePage from "./index";
import {
  updateRole,
  deleteRole,
  getRoleById,
} from "../../../../Services/RoleService/roleService";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";

vi.mock("../../../../Services/RoleService/roleService", () => ({
  updateRole: vi.fn(),
  deleteRole: vi.fn(),
  getRoleById: vi.fn(),
}));

describe("RolesUpdatePage", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { roleId: "mock-role-id" } }]}>
        <Routes>
          <Route path="/" element={<RolesUpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Nome do Perfil")).toBeInTheDocument();
    expect(screen.getByText("Financeiro")).toBeInTheDocument();
    expect(screen.getByText("Benefícios")).toBeInTheDocument();
    expect(screen.getByText("Usuários")).toBeInTheDocument();
  });

  it("displays error when profile name is empty and submit is clicked", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { roleId: "mock-role-id" } }]}>
        <Routes>
          <Route path="/" element={<RolesUpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("SALVAR"));

    expect(
      screen.getByText("Nome é um campo obrigatório!")
    ).toBeInTheDocument();
  });

  it("toggles checkboxes correctly", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { roleId: "mock-role-id" } }]}>
        <Routes>
          <Route path="/" element={<RolesUpdatePage />} />
        </Routes>
      </MemoryRouter>
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
      <MemoryRouter initialEntries={[{ state: { roleId: "mock-role-id" } }]}>
        <Routes>
          <Route path="/" element={<RolesUpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Nome do Perfil"), {
      target: { value: "Admin" },
    });

    const financeRow = screen.getByText("Financeiro").closest("div");
    const financeCheckboxes = financeRow.querySelectorAll(
      'input[type="checkbox"]'
    );

    fireEvent.click(financeCheckboxes[0]);
    fireEvent.click(financeCheckboxes[2]);

    // Adiciona logs para depurar
    console.log("Antes de submeter o formulário");

    // Mock da resposta da API
    updateRole.mockResolvedValue({ status: 200 });

    // Submeter o formulário
    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    fireEvent.click(screen.getByText("Confirmar"));

    // Adiciona logs para verificar se chegou aqui
    console.log("Depois de submeter o formulário");

    // Use waitFor para garantir que a função foi chamada corretamente
    await waitFor(() => {
      expect(updateRole).toHaveBeenCalledWith("mock-role-id", {
        name: "Admin",
        permissions: [
          { module: "finance", access: ["create", "update"] },
          { module: "benefits", access: [] },
          { module: "users", access: [] },
        ],
      });
    });

    // Verifica se o modal de sucesso foi exibido
    expect(screen.getByText("PERFIL ALTERADO COM SUCESSO")).toBeInTheDocument();
  });

  it("deletes the profile correctly", async () => {
    // Mock da resposta da função getRoleById para simular a resposta do serviço
    getRoleById.mockResolvedValue({
      name: "Admin",
      permissions: [
        { module: "finance", access: ["create", "read"] },
        { module: "benefits", access: [] },
        { module: "users", access: [] },
      ],
    });

    render(
      <MemoryRouter initialEntries={[{ state: { roleId: "mock-role-id" } }]}>
        <Routes>
          <Route path="/" element={<RolesUpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Mock da resposta da função deleteRole
    deleteRole.mockResolvedValue({ status: 204 });

    // Clicar no botão DELETAR para abrir o modal de confirmação
    fireEvent.click(screen.getByText("DELETAR"));

    // Clicar no botão Confirmar para deletar o perfil
    fireEvent.click(screen.getByText("Confirmar"));

    // Use waitFor para garantir que a função foi chamada corretamente
    await waitFor(() => {
      expect(deleteRole).toHaveBeenCalledWith("mock-role-id");
    });

    // Verifica se o modal de sucesso foi exibido
    expect(screen.getByText("PERFIL DELETADO COM SUCESSO")).toBeInTheDocument();
  });

  it("displays warning when an unknown module is encountered", async () => {
    // Espiona a função console.warn
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Mock da função getRoleById para retornar um módulo desconhecido
    getRoleById.mockResolvedValue({
      name: "Admin",
      permissions: [
        { module: "unknown_module", access: ["create", "read"] }, // Módulo desconhecido
      ],
    });

    render(
      <MemoryRouter initialEntries={[{ state: { roleId: "mock-role-id" } }]}>
        <Routes>
          <Route path="/" element={<RolesUpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Aguarda a execução do efeito
    await waitFor(() => {
      // Verifica se console.warn foi chamado com a mensagem esperada
      expect(warnSpy).toHaveBeenCalledWith(
        "Módulo desconhecido encontrado: unknown_module"
      );
    });

    // Limpa o mock do console.warn
    warnSpy.mockRestore();
  });
});
