import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Benefits from "./index";
import "@testing-library/jest-dom";

vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    somePermission: true,
  }),
  checkAction: () => (permissions, entity, action) => action === "create",
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
    vi.mock("../../../../Utils/permission", () => ({
      usePermissions: () => ({}),
      checkAction: () => false, // Simulate no permission to create
    }));

    render(
      <Router>
        <Benefits />
      </Router>
    );

    await waitFor(() => {
      // Verify the "CADASTRO DE BENEFÍCIOS" button is not rendered
      expect(
        screen.queryByText("CADASTRO DE BENEFÍCIOS")
      ).not.toBeInTheDocument();

      // "LISTA DE BENEFÍCIOS" should still be there
      expect(screen.getByText("LISTA DE BENEFÍCIOS")).toBeInTheDocument();
    });
  });
});
