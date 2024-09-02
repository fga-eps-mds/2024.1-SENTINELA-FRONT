// src/Pages/Protected/Users/userHubPage/index.test.jsx

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserHubPage from "./index";
import "@testing-library/jest-dom";


vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    somePermission: true,
  }),
  checkAction: () => true,
}));

describe("UserHubPage", () => {
  beforeEach(() => {
    render(
      <Router>
        <UserHubPage />
      </Router>
    );
  });

  it("renders all buttons correctly", () => {
    expect(screen.getByText("Filiações pendentes")).toBeInTheDocument();
    expect(screen.getByText("LISTA DE USUÁRIOS")).toBeInTheDocument();
    expect(screen.getByText("LISTA DE PERFIL")).toBeInTheDocument();
    expect(screen.getByText("LISTA DE ÓRGÃOS")).toBeInTheDocument();
  });

  it("navigates to lista de usuarios page on button click", async () => {
    fireEvent.click(screen.getByText(/LISTA DE USUÁRIOS/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/usuarios");
    });
  });

  it("navigates to lista de perfil page on button click", async () => {
    fireEvent.click(screen.getByText(/LISTA DE PERFIL/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/perfis");
    });
  });

  it("navigates to organ list on button click", async () => {
    fireEvent.click(screen.getByText(/Lista de Órgãos/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/organ/list");
    });
  });

  it("renders logos correctly", () => {
    expect(screen.getByAltText("Sindpol Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Sentinela Logo")).toBeInTheDocument();
  });
});
