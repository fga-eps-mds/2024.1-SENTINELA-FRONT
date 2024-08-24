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
    }),
  };
});

describe("ProfileUpdate", () => {
  beforeEach(() => {
    localStorage.setItem(
      "@App:user",
      JSON.stringify({
        _id: "123",
        name: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
        status: true,
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
    expect(
      await screen.findByText(/Visualização de usuário/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Dados pessoais/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Celular/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Salvar/i)).toBeInTheDocument();
  });

  it("navigates to home on cancel", async () => {
    render(
      <Router>
        <AuthProvider>
          <ProfileUpdate />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByText(/Cancelar/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });
});
