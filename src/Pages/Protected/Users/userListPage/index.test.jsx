import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserListPage from "./index";
import { getUsers } from "../../../../Services/userService";
import { getRoleById } from "../../../../Services/RoleService/roleService";
import AuthContext from "../../../../Context/auth";
import "@testing-library/jest-dom";

vi.mock("../../../../Services/userService", () => ({
  getUsers: vi.fn(),
}));

vi.mock("../../../../Services/RoleService/roleService", () => ({
  getRoleById: vi.fn(),
}));

vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    // Retorne um objeto com permissões fictícias para os testes
    somePermission: true,
  }),
  checkAction: () => true,
}));

const mockContextValue = {
  user: { role: "mock-role" },
};

describe("UserListPage", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly with the 'Cadastrar Usuário' button visible", async () => {
    vi.mocked(getRoleById).mockResolvedValue({ permissions: ["create"] });

    render(
      <AuthContext.Provider value={mockContextValue}>
        <Router>
          <UserListPage />
        </Router>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          (content, element) =>
            element.tagName.toLowerCase() === "h1" &&
            content.includes("Lista de Usuários")
        )
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          (content, element) =>
            element.tagName.toLowerCase() === "button" &&
            content.includes("Cadastrar Usuário")
        )
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Pesquisar Usuário")).toBeInTheDocument();
    });
  });

  it("fetches and displays users", async () => {
    const users = [
      { _id: "1", name: "John Doe" },
      { _id: "2", name: "Jane Smith" },
    ];
    getUsers.mockResolvedValueOnce(users);

    render(
      <AuthContext.Provider value={mockContextValue}>
        <Router>
          <UserListPage />
        </Router>
      </AuthContext.Provider>
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
      <AuthContext.Provider value={mockContextValue}>
        <Router>
          <UserListPage />
        </Router>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText("Pesquisar Usuário"), {
        target: { value: "John" },
      });

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });
  });

  it("navigates to user creation page on button click", async () => {
    render(
      <AuthContext.Provider value={mockContextValue}>
        <Router>
          <UserListPage />
        </Router>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      fireEvent.click(
        screen.getByText(
          (content, element) =>
            element.tagName.toLowerCase() === "button" &&
            content.includes("Cadastrar Usuário")
        )
      );

      expect(window.location.pathname).toBe("/usuarios/criar");
    });
  });

  it("navigates to user edit page on list item click", async () => {
    const users = [
      { _id: "1", name: "John" },
      { _id: "2", name: "Jane" },
    ];
    getUsers.mockResolvedValueOnce(users);

    render(
      <AuthContext.Provider value={mockContextValue}>
        <Router>
          <UserListPage />
        </Router>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("John"));
    });

    expect(window.location.pathname).toBe(`/usuarios/editar/${users[0].name}`);
  });
});
