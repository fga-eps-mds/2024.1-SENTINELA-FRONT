import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Benefits from "./index";
import "@testing-library/jest-dom";

let canCreatePermission = true;

vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    somePermission: true,
  }),
  checkAction: () => canCreatePermission,
}));

vi.mock("../../../../Context/auth", () => ({
  useAuth: () => ({
    user: { name: "Test User" }, // Mocking a user
  }),
}));

describe("Benefits", () => {
  it("renders buttons correctly", () => {
    render(
      <Router>
        <Benefits />
      </Router>
    );

    waitFor(() => {
      expect(screen.getByText("CADASTRO DE BENEFÍCIOS")).toBeInTheDocument();
      expect(screen.getByText("LISTA DE BENEFÍCIOS")).toBeInTheDocument();
    });
  });

  it("navigates to cadastro de benefícios page on button click", () => {
    render(
      <Router>
        <Benefits />
      </Router>
    );

    waitFor(() => {
      expect(screen.getByText("CADASTRO DE BENEFÍCIOS")).toBeInTheDocument();
      fireEvent.click(screen.getByText("CADASTRO DE BENEFÍCIOS"));
    });
    waitFor(() => {
      expect(window.location.pathname).toBe("/beneficios/criar");
    });
  });

  it("navigates to lista de benefícios page on button click", async () => {
    render(
      <Router>
        <Benefits />
      </Router>
    );

    waitFor(() => {
      expect(screen.getByText("LISTA DE BENEFÍCIOS")).toBeInTheDocument();
      fireEvent.click(screen.getByText("LISTA DE BENEFÍCIOS"));
    });
    waitFor(() => {
      expect(window.location.pathname).toBe("/beneficios/lista");
    });
  });

  it("does not render the 'CADASTRO DE BENEFÍCIOS' button when canCreate is false", async () => {
    // Ajustar a variável global para simular ausência de permissão de criação
    canCreatePermission = false;

    render(
      <Router>
        <Benefits />
      </Router>
    );

    await waitFor(() => {
      // Verificar que o botão CADASTRO DE BENEFÍCIOS não está presente
      expect(
        screen.queryByText("CADASTRO DE BENEFÍCIOS")
      ).not.toBeInTheDocument();

      // O botão LISTA DE BENEFÍCIOS ainda deve estar presente
      expect(screen.getByText("LISTA DE BENEFÍCIOS")).toBeInTheDocument();
    });
  });

  it("renders buttons correctly when user has create permission", async () => {
    // Ajustar a variável global para simular permissão de criação
    canCreatePermission = true;

    render(
      <Router>
        <Benefits />
      </Router>
    );

    await waitFor(() => {
      // Verificar se o botão de CADASTRO DE BENEFÍCIOS está presente
      expect(screen.getByText("CADASTRO DE BENEFÍCIOS")).toBeInTheDocument();
    });
  });
});
