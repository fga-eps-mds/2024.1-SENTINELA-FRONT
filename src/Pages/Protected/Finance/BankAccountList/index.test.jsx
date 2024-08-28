import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ListBankAccount from "./index";
import { getAll } from "../../../../../src/Services/bankAccountService";
import "@testing-library/jest-dom";

// Mockar o serviço getAll
vi.mock("../../../../../src/Services/bankAccountService", () => ({
  getAll: vi.fn(),
}));

// Mockar o contexto de autenticação
vi.mock("../../../../Context/auth", () => ({
  useAuth: () => ({
    user: { name: "Test User" }, // Simula que um usuário está autenticado
  }),
}));

describe("ListBankAccount", () => {
  beforeEach(() => {
    // Mocka a função getAll para retornar dados simulados
    getAll.mockResolvedValue([
      { _id: "1", name: "Conta Teste 1" },
      { _id: "2", name: "Conta Teste 2" },
    ]);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the list of bank accounts", async () => {
    render(
      <MemoryRouter>
        <ListBankAccount />
      </MemoryRouter>
    );

    // Verifica se o título está sendo exibido
    expect(screen.getByText("Lista de Contas Bancárias")).toBeInTheDocument();

    // Verifica se os botões e itens da lista estão sendo renderizados
    expect(screen.getByText("Cadastrar contas bancárias")).toBeInTheDocument();
    expect(await screen.findByText("Conta Teste 1")).toBeInTheDocument();
    expect(await screen.findByText("Conta Teste 2")).toBeInTheDocument();
  });

  it("filters bank accounts based on search input", async () => {
    render(
      <MemoryRouter>
        <ListBankAccount />
      </MemoryRouter>
    );

    // Verifica se todos os itens estão presentes inicialmente
    expect(await screen.findByText("Conta Teste 1")).toBeInTheDocument();
    expect(await screen.findByText("Conta Teste 2")).toBeInTheDocument();

    // Preenche o campo de busca e verifica o filtro
    fireEvent.change(screen.getByLabelText("Pesquisar conta bancária"), {
      target: { value: "1" },
    });

    // Verifica se apenas um item está presente
    expect(await screen.findByText("Conta Teste 1")).toBeInTheDocument();
    expect(screen.queryByText("Conta Teste 2")).toBeNull();
  });

  it("navigates to register page when button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ListBankAccount />} />
          <Route path="/finance/criar" element={<div>Register Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica se a navegação para a página de registro é acionada
    fireEvent.click(screen.getByText("Cadastrar contas bancárias"));
    expect(screen.getByText("Register Page")).toBeInTheDocument();
  });
});
