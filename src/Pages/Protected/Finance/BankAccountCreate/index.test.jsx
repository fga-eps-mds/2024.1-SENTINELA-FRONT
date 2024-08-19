import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom"; // Adicione isso se estiver usando Jest DOM

import BankAccountCreate from "./index";
import { useAuth } from "../../../../Context/auth";

// Mock do useAuth para simular um usuário autenticado
vi.mock("../../../../Context/auth", () => ({
  useAuth: vi.fn(),
}));

describe("BankAccountCreate Component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form correctly when user is authenticated", () => {
    // Configuração do mock para retornar um usuário autenticado
    useAuth.mockReturnValue({
      user: { id: 1, name: "Test User" },
    });

    render(
      <Router>
        <BankAccountCreate />
      </Router>
    );

    // Verifica se o texto esperado está no documento
    expect(screen.getByText("Cadastro de Conta Bancária")).toBeInTheDocument();
  });

  it("does not render the form when user is not authenticated", () => {
    // Configuração do mock para retornar um usuário não autenticado
    useAuth.mockReturnValue({
      user: null,
    });

    render(
      <Router>
        <BankAccountCreate />
      </Router>
    );

    // Verifica se o texto esperado não está no documento
    expect(screen.queryByText("Cadastro de Conta Bancária")).toBeNull();
  });
});
