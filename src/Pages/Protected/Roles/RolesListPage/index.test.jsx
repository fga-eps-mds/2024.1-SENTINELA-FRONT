import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RolesListPage from "./index";
import { APIUsers } from "../../../../Services/BaseService";

import "@testing-library/jest-dom";

// Mockando a instância do Axios
vi.mock("../../../../Services/BaseService", () => ({
  APIUsers: {
    get: vi.fn(),
  },
}));

describe("RolesListPage", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", async () => {
    // Mockando a resposta da função get do APIUsers
    APIUsers.get.mockResolvedValue({ data: [] });

    render(
      <Router>
        <RolesListPage />
      </Router>
    );

    expect(screen.getByText("Lista de perfis")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar perfil")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquisar perfil")).toBeInTheDocument();

    await waitFor(() => expect(APIUsers.get).toHaveBeenCalledTimes(1));
  });

  it("fetches and displays roles", async () => {
    const roles = [
      { _id: "1", name: "Perfil 1" },
      { _id: "2", name: "Perfil 2" },
    ];
    APIUsers.get.mockResolvedValue({ data: roles });

    render(
      <Router>
        <RolesListPage />
      </Router>
    );

    await waitFor(() => expect(APIUsers.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Perfil 1")).toBeInTheDocument();
    expect(screen.getByText("Perfil 2")).toBeInTheDocument();
  });

  it("filters roles based on search input", async () => {
    const roles = [
      { _id: "1", name: "Perfil 1" },
      { _id: "2", name: "Perfil 2" },
    ];
    APIUsers.get.mockResolvedValue({ data: roles });

    render(
      <Router>
        <RolesListPage />
      </Router>
    );

    await waitFor(() => expect(APIUsers.get).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByLabelText("Pesquisar perfil");
    fireEvent.change(searchInput, { target: { value: "1" } });

    expect(screen.getByText("Perfil 1")).toBeInTheDocument();
    expect(screen.queryByText("Perfil 2")).not.toBeInTheDocument();
  });
});
