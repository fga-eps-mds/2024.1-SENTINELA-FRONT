import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserListPage from "./index";
import { getUsers } from "../../../../Services/userService";
import "@testing-library/jest-dom";

vi.mock("../../../../Services/userService", () => ({
  getUsers: vi.fn(),
}));

describe("UserListPage", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", () => {
    render(
      <Router>
        <UserListPage />
      </Router>
    );

    expect(screen.getByText("Lista de Usuários")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar Usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquisar Usuário")).toBeInTheDocument();
  });

  it("fetches and displays users", async () => {
    const users = [
      { _id: "1", name: "John Doe" },
      { _id: "2", name: "Jane Smith" },
    ];
    getUsers.mockResolvedValueOnce(users);

    render(
      <Router>
        <UserListPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("filters users based on search input", async () => {
    const users = [
      { _id: "1", name: "John Doe" },
      { _id: "2", name: "Jane Smith" },
    ];
    getUsers.mockResolvedValueOnce(users);

    render(
      <Router>
        <UserListPage />
      </Router>
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText("Pesquisar Usuário"), {
        target: { value: "John" },
      });

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });
  });

  it("navigates to user creation page on button click", () => {
    render(
      <Router>
        <UserListPage />
      </Router>
    );

    fireEvent.click(screen.getByText(/Cadastrar Usuário/i));

    expect(window.location.pathname).toBe("/usuarios/criar");
  });

  it("navigates to user edit page on list item click", async () => {
    const users = [
      { _id: "1", name: "John" },
      { _id: "2", name: "Jane" },
    ];
    getUsers.mockResolvedValueOnce(users);

    render(
      <Router>
        <UserListPage />
      </Router>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("John"));
    });

    expect(window.location.pathname).toBe(`/usuarios/editar/${users[0].name}`);
  });
});
