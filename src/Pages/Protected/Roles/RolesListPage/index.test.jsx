import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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
});
