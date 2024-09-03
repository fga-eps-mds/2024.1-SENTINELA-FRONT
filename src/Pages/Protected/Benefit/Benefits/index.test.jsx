import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Benefits from "./index";
import "@testing-library/jest-dom";

vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    somePermission: true,
  }),
  checkAction: () => true,
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
});
