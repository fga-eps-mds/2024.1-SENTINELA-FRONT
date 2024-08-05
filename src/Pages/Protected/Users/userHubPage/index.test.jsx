import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserHubPage from "./index";
import "@testing-library/jest-dom";

describe("UserHubPage", () => {
  it("renders buttons correctly", () => {
    render(
      <Router>
        <UserHubPage />
      </Router>
    );

    expect(screen.getByText("CADASTRO DE USUÁRIOS")).toBeInTheDocument();
    expect(screen.getByText("LISTA DE USUÁRIOS")).toBeInTheDocument();
    expect(screen.getByText("ATUALIZAR USUÁRIO")).toBeInTheDocument();
  });

  it("navigates to cadastro de usuarios page on button click", async () => {
    render(
      <Router>
        <UserHubPage />
      </Router>
    );

    fireEvent.click(screen.getByText(/CADASTRO DE USUÁRIOS/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/usuarios/criar");
    });
  });
  it("navigates to lista de usuarios page on button click", async () => {
    render(
      <Router>
        <UserHubPage />
      </Router>
    );

    fireEvent.click(screen.getByText(/LISTA DE USUÁRIOS/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/usuarios");
    });
  });
  it("navigates to atualizar dados page on button click", async () => {
    render(
      <Router>
        <UserHubPage />
      </Router>
    );

    fireEvent.click(screen.getByText(/ATUALIZAR USUÁRIO/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/perfil");
    });
  });
});
