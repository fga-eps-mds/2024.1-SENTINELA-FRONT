import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ViewMembershipPage from "./index";
import {
  getMemberShipById,
  deleteMember,
} from "../../../../Services/memberShipService";
import "@testing-library/jest-dom";

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
      phone: "(12) 73891-2738",
      sex: "Masculino",
      bloodType: "A+",
      ufAddress: "MA",
      rg: "3817238921789",
      cpf: "312.839.021-83",
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
    expect(phoneInput.value).to.equal("(12) 73891-2738");
  });

  it("adds a dependent correctly", async () => {
    const { container } = render(
      <Router>
        <ViewMembershipPage />
      </Router>
    );

    // 27 Entradas (não contando datas) antes da abertura do formulario de dependente
    let inputs = container.querySelectorAll(".MuiFilledInput-input");
    expect(inputs).toHaveLength(27);

    // Clicar no botão para abrir
    const icon = screen.getByTestId("add-dependent-icon");
    fireEvent.click(icon);

    // Esperar o form abrir
    const dependentForm = await waitFor(() =>
      container.querySelector(".dependentToAdd")
    );

    // Garantir que abriu
    if (!dependentForm) {
      throw new Error("Dependent form not found");
    }

    // Verificar os novos campos (4 novos + 1 de Data)
    inputs = container.querySelectorAll(".MuiFilledInput-input");
    expect(inputs).toHaveLength(31);

    //Selecionar ultimas entradas
    inputs = Array.from(inputs).slice(-4);

    // Preencher os campos
    fireEvent.change(inputs[0], { target: { value: "João Teste" } });
    fireEvent.change(inputs[1], { target: { value: "Filho" } });
    fireEvent.change(inputs[2], { target: { value: "123.456.789-01" } });
    fireEvent.change(inputs[3], { target: { value: "(11) 11111-1111" } });

    // Agora a data de nascimento
    const { getByPlaceholderText } = within(dependentForm);
    fireEvent.change(getByPlaceholderText(/DD\/MM\/YYYY/i), {
      target: { value: "01/01/2000" },
    });

    // Envia o form
    fireEvent.click(screen.getByText(/Confirmar Dependente/i));

    // Confere o registro
    await waitFor(() => {
      expect(screen.getByText(/Dependente 1/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/João Teste/i)).toBeInTheDocument();
    });
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

  it("update a user successfully", async () => {
    // Mock da resposta da função getMemberShipById
    getMemberShipById.mockResolvedValueOnce({
      email: "test@example.com",
      name: "John Doe",
      phone: "(12) 73891-2738",
      sex: "Masculino",
      bloodType: "A+",
      ufAddress: "MA",
      rg: "3817238921789",
      cpf: "312.839.021-83",
      registration: "12345",
      birthDate: "2000-01-01",
      dependents: [],
    });

    // Renderiza o componente
    setup();

    // Preenche os campos do formulário
    fireEvent.change(screen.getByLabelText("Nome Completo *"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText("E-mail *"), {
      target: { value: "jane.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Celular *"), {
      target: { value: "(11) 91234-5678" },
    });

    // Simula o clique no botão de confirmar
    const updateButton = await screen.findByText("Atualizar dados do Usuário");
    expect(updateButton).toBeInTheDocument();
    fireEvent.click(updateButton);

    const confirmButton = await screen.findByText("Sim");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(updateButton);
  });
});
