import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import OrganCreate from "./index";
import { useAuth } from "../../../../Context/auth";

vi.mock("../../../../Context/auth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../../../Services/organService", () => ({
  createOrgan: vi.fn(),
}));

describe("OrganCreate Component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form correctly when user is authenticated", () => {
    useAuth.mockReturnValue({
      user: { id: 1, name: "Test User" },
    });

    render(
      <Router>
        <OrganCreate />
      </Router>
    );

    expect(screen.getByText("Cadastro de Órgãos")).toBeInTheDocument();
  });

  //   it("shows error message when required fields are missing", () => {
  //     useAuth.mockReturnValue({
  //       organ: { nomeOrgao: "", lotacao: "", sigla: "" },
  //     });

  //     render(
  //       <Router>
  //         <OrganCreate />
  //       </Router>
  //     );

  //     fireEvent.click(screen.getByText("Cadastrar"));

  //     expect(
  //       screen.getByText("Preencha todos os campos obrigatórios.")
  //     ).toBeInTheDocument();
  //   });

  //   it("shows unique error message if name is already registered", async () => {
  //     useAuth.mockReturnValue({
  //       user: { id: 1, name: "Test User" },
  //     });

  //     createOrgan.mockResolvedValue({
  //       status: 409,
  //       data: { error: "Nome já cadastrado" },
  //     });

  //     render(
  //       <Router>
  //         <OrganCreate />
  //       </Router>
  //     );

  //     fireEvent.change(screen.getByLabelText(/Nome do órgão/i), {
  //       target: { value: "Conta Teste" },
  //     });
  //     fireEvent.click(screen.getByText("Cadastrar"));

  //     expect(await screen.findByText("Nome já cadastrado")).toBeInTheDocument();
  //   });

  //   it.only("navigates to list page after successful creation", async () => {
  //     useAuth.mockReturnValue({
  //       organ: { nomeOrgao: "Conta Teste", lotacao: "Teste", sigla: "TST" },
  //     });

  //     createOrgan.mockResolvedValue({
  //       status: 201,
  //     });

  //     render(
  //       <Router>
  //         <OrganCreate />
  //       </Router>
  //     );

  //     // Verifique se o input existe e é acessível
  //     const inputNome = screen.getByLabelText(/Nome do órgão/i);
  //     expect(inputNome).toBeInTheDocument();

  //     const inputLotacao = screen.getByLabelText(/Lotação/i);
  //     expect(inputLotacao).toBeInTheDocument();

  //     const inputSigla = screen.getByLabelText(/Sigla/i);
  //     expect(inputSigla).toBeInTheDocument();

  //     // Alterando o valor do input
  //     fireEvent.change(inputNome, { target: { value: "Conta Teste" } });

  //     // Verifique se o botão de cadastrar existe e é acessível
  //     const buttonCadastrar = screen.getByText("Cadastrar");
  //     expect(buttonCadastrar).toBeInTheDocument();

  //     // Clique no botão de cadastrar
  //     fireEvent.click(buttonCadastrar);

  //     // Espera pelo modal aparecer com `findByRole`
  //     const modal = await screen.findByTestId('modal-overlay');
  //     expect(modal).toBeInTheDocument();

  //     // Verifique o texto dentro do modal
  //     expect(await screen.findByText(/Órgão cadastrado com sucesso!/i)).toBeInTheDocument();

  //     // Clique para fechar o modal
  //     fireEvent.click(screen.getByText("OK"));

  //     // Verifique o redirecionamento
  //     expect(window.location.pathname).toBe("/organ/list");
  //   });
});
