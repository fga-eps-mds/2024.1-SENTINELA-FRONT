import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Finance from "./index";
import "@testing-library/jest-dom";
import { useAuth } from "../../../../Context/auth";

// Mock do hook useAuth
vi.mock("../../../../Context/auth", () => ({
  useAuth: vi.fn(),
}));

describe("Finance", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { name: "Test User" }, // Mock do usuário autenticado
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <Router>
        <Finance />
      </Router>
    );
    expect(screen.getByAltText("Sindpol Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Sentinela Logo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cadastro de Fornecedores" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Lista de forncedores" })
    ).toBeInTheDocument(); // Corrigido para o nome correto
    expect(
      screen.getByRole("button", { name: "Cadastro de conta bancária" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Lista de contas bancárias" })
    ).toBeInTheDocument();
  });
});
