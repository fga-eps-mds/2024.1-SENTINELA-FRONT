import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";
import RolesUpdatePage from "./index";
// import { updateRole } from "../../../../Services/RoleService/roleService";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

vi.mock("../../../../Services/RoleService/roleService", () => ({
  updateRole: vi.fn(),
}));

describe("RolesUpdatePage", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { roleId: "mock-role-id" } }]}>
        <Routes>
          <Route path="/" element={<RolesUpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Nome do Perfil")).toBeInTheDocument();
    expect(screen.getByText("Financeiro")).toBeInTheDocument();
    expect(screen.getByText("Benefícios")).toBeInTheDocument();
    expect(screen.getByText("Usuários")).toBeInTheDocument();
  });
});
