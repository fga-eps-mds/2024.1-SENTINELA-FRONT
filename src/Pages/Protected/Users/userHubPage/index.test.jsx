import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserHubPage from "./index";
import "@testing-library/jest-dom";

describe("UserHubPage", () => {
  beforeEach(() => {
    // Renderiza o componente antes de cada teste
    render(
      <Router>
        <UserHubPage />
      </Router>
    );
  });

  it("renders all buttons correctly", () => {
    expect(screen.getByText("Filiações pendentes")).toBeInTheDocument();
    expect(screen.getByText("CADASTRO DE USUÁRIOS")).toBeInTheDocument();
    expect(screen.getByText("LISTA DE USUÁRIOS")).toBeInTheDocument();
    expect(screen.getByText("ATUALIZAR USUÁRIO")).toBeInTheDocument();
    expect(screen.getByText("CADASTRO DE PERFIL")).toBeInTheDocument();
    expect(screen.getByText("LISTA DE PERFIL")).toBeInTheDocument();
  });

  it("navigates to cadastro de usuarios page on button click", async () => {
    fireEvent.click(screen.getByText(/CADASTRO DE USUÁRIOS/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/usuarios/criar");
    });
  });

  it("navigates to lista de usuarios page on button click", async () => {
    fireEvent.click(screen.getByText(/LISTA DE USUÁRIOS/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/usuarios");
    });
  });

  it("navigates to atualizar dados page on button click", async () => {
    fireEvent.click(screen.getByText(/ATUALIZAR USUÁRIO/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/perfil");
    });
  });

  it("navigates to cadastro de perfil page on button click", async () => {
    fireEvent.click(screen.getByText(/CADASTRO DE PERFIL/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/perfis/criar");
    });
  });

  it("navigates to lista de perfil page on button click", async () => {
    fireEvent.click(screen.getByText(/LISTA DE PERFIL/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/perfis");
    });
  });

  it("renders logos correctly", () => {
    expect(screen.getByAltText("Sindpol Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Sentinela Logo")).toBeInTheDocument();
  });
});
