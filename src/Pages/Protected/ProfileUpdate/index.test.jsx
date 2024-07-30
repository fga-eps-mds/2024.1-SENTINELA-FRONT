import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import ProfileUpdate from "./index";
import { AuthProvider } from "../../../Context/auth";

vi.mock("../../../Context/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      user: {
        _id: "123",
        name: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
        status: true,
      },
      token: "fake-token",
    }),
  };
});

describe("ProfileUpdate", () => {
  beforeEach(() => {
    localStorage.setItem(
      "@App:user",
      JSON.stringify({
        user: {
          _id: "123",
          name: "John Doe",
          phone: "1234567890",
          email: "john@example.com",
          status: true,
        },
        token: "fake-token",
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders the form correctly", async () => {
    render(
      <Router>
        <AuthProvider>
          <ProfileUpdate />
        </AuthProvider>
      </Router>
    );

    // Aguarda até que o texto "Visualização de usuário" esteja disponível
    const visualizacaoDeUsuario = await screen.findByText(
      /Visualização de usuário/i
    );
    expect(visualizacaoDeUsuario).toBeInTheDocument();

    expect(screen.getByText(/Dados pessoais/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Celular/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Salvar/i)).toBeInTheDocument();
  });

  it("navigates to home on cancel", async () => {
    const { container } = render(
      <Router>
        <AuthProvider>
          <ProfileUpdate />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByText(/Cancelar/i));
    await waitFor(() => {
      expect(container.innerHTML).toMatch(/Página Inicial/i);
    });
  });
});
