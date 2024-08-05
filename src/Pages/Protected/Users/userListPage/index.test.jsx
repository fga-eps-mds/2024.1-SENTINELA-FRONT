import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserListPage from "./index";
import { APIUsers } from "../../../../Services/BaseService";
import "@testing-library/jest-dom";

// Mocking the APIUsers service and useNavigate hook
vi.mock("../../../../Services/BaseService", () => ({
  APIUsers: {
    get: vi.fn(),
  },
}));

describe("UserListPage", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", async () => {
    APIUsers.get.mockResolvedValueOnce({ data: [] });

    render(
      <Router>
        <UserListPage />
      </Router>
    );

    expect(screen.getByText("Lista de Usuários")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar Usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquisar Usuário")).toBeInTheDocument();

    await waitFor(() => expect(APIUsers.get).toHaveBeenCalledTimes(1));
  });

  it("fetches and displays users", async () => {
    const users = [
      { _id: "1", name: "John Doe" },
      { _id: "2", name: "Jane Smith" },
    ];
    APIUsers.get.mockResolvedValueOnce({ data: users });

    render(
      <Router>
        <UserListPage />
      </Router>
    );

    await waitFor(() => expect(APIUsers.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters users based on search input", async () => {
    const users = [
      { _id: "1", name: "John Doe" },
      { _id: "2", name: "Jane Smith" },
    ];
    APIUsers.get.mockResolvedValueOnce({ data: users });

    render(
      <Router>
        <UserListPage />
      </Router>
    );

    await waitFor(() => expect(APIUsers.get).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByLabelText("Pesquisar Usuário");
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("navigates to user creation page on button click", async () => {
    render(
      <Router>
        <UserListPage />
      </Router>
    );

    fireEvent.click(screen.getByText(/CADASTRAR USUÁRIO/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/usuarios/criar");
    });
  });

  it("navigates to user edit page on list item click", async () => {
    const users = [
      { _id: "1", name: "John" },
      { _id: "2", name: "Jane" },
    ];
    APIUsers.get.mockResolvedValueOnce({ data: users });
    render(
      <Router>
        <UserListPage />
      </Router>
    );
    expect(APIUsers.get).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      fireEvent.click(screen.getByText("John"));
    });

    expect(window.location.pathname).toBe(`/usuarios/editar/${users[0].name}`);
  });
});
