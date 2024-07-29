import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserListPage from "./index";
import { APIUsers } from "../../../../Services/BaseService";
import "@testing-library/jest-dom";

vi.mock("../../../../Services/BaseService");

describe("UserListPage", () => {
  const mockUsers = [
    { _id: "1", name: "John Doe" },
    { _id: "2", name: "Jane Smith" },
  ];

  beforeEach(() => {
    APIUsers.get.mockResolvedValue({ data: mockUsers });
    localStorage.setItem(
      "@App:user",
      JSON.stringify({ token: "fake-token", user: { name: "Test User" } })
    );
  });

  it("renders the user list page correctly", async () => {
    render(
      <Router>
        <UserListPage />
      </Router>
    );

    expect(screen.getByText("Lista de Usuários")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar Usuário")).toBeInTheDocument();
    expect(screen.getByText("Pesquisar Usuário")).toBeInTheDocument();

    await screen.findByText("John Doe");
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters users based on search input", async () => {
    render(
      <Router>
        <UserListPage />
      </Router>
    );

    await screen.findByText("John Doe");

    const searchInput = screen.getByLabelText("Pesquisar Usuário");
    fireEvent.change(searchInput, { target: { value: "Jane" } });

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
