import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ViewMembershipPage from "./index";
import {
  getMemberShipById,
  deleteMember,
} from "../../../../Services/memberShipService";

vi.mock("../../../../Services/memberShipService", () => ({
  getMemberShipById: vi.fn(),
  updateMembership: vi.fn(),
  deleteMember: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => ({
      state: { membershipId: "123" },
    }),
  };
});

describe("ViewMembershipPage", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const setup = () => {
    return render(
      <Router>
        <ViewMembershipPage />
      </Router>
    );
  };

  it("renders correctly with fetched membership data", async () => {
    getMemberShipById.mockResolvedValueOnce({
      email: "test@example.com",
      name: "John Doe",
      phone: "1234567890",
      sex: "Masculino",
      bloodType: "A+",
      registration: "12345",
      birthDate: "2000-01-01",
      dependents: [],
    });

    setup();

    const emailInput = await screen.findByLabelText("E-mail *");
    const nameInput = await screen.findByLabelText("Nome Completo *");
    const phoneInput = await screen.findByLabelText("Celular *");

    // Verifica o valor dos inputs
    expect(emailInput.value).to.equal("test@example.com");
    expect(nameInput.value).to.equal("John Doe");
    expect(phoneInput.value).to.equal("1234567890");
  });

  it("adds a dependent correctly", async () => {
    getMemberShipById.mockResolvedValueOnce({
      dependents: [],
    });

    setup();

    fireEvent.click(screen.getByText("Adicionar Dependente"));
    fireEvent.change(screen.getByLabelText("Nome Completo *"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText("Data de Nascimento *"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByLabelText("CPF *"), {
      target: { value: "123.456.789-00" },
    });
    fireEvent.change(screen.getByLabelText("Celular *"), {
      target: { value: "(11) 91234-5678" },
    });
  });

  it("shows validation errors on missing fields when updating user", async () => {
    getMemberShipById.mockResolvedValueOnce({
      name: "",
      email: "",
      phone: "",
      bloodType: "",
    });

    setup();

    fireEvent.click(screen.getByText("Atualizar dados do Usuário"));

    fireEvent.click(screen.getByText("Sim"));
  });

  it("deletes a user successfully", async () => {
    getMemberShipById.mockResolvedValueOnce({
      email: "test@example.com",
      name: "John Doe",
      phone: "1234567890",
    });
    deleteMember.mockResolvedValueOnce();

    setup();

    fireEvent.click(screen.getByText("Deletar Usuário"));

    fireEvent.click(screen.getByText("Sim"));

    await waitFor(() => {
      expect(deleteMember).toHaveBeenCalledWith("123");
    });
  });
});
