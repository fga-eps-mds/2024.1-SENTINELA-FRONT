import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import OrganId from "./index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  deleteOrganById,
  updateOrgan,
} from "../../../../Services/organService";

describe("OrgansUpdate", () => {
  beforeEach(() => {
    vi.mock("../../../../Services/organService", () => {
      return {
        updateOrgan: vi.fn(),
        deleteOrganById: vi.fn(),
        getOrganById: vi.fn().mockResolvedValue({
          orgao: "NomeTeste",
          lotacao: [
            {
              nomeLotacao: "Lotação A",
              sigla: "LA",
            },
          ],
        }),
      };
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders correctly", async () => {
    render(
      <Router>
        <OrganId />
      </Router>
    );

    expect(screen).toMatchSnapshot();
    expect(screen.getByText("Editar Órgão")).toBeInTheDocument();
    expect(screen.getByText("Dados do Órgão")).toBeInTheDocument();
    expect(screen.getByText("Dados de Lotação")).toBeInTheDocument();
  });

  it("validate form before submit", async () => {
    render(
      <Router>
        <OrganId />
      </Router>
    );

    const nomeInput = await screen.findByLabelText("Órgão *");
    const lotInput = await screen.findByLabelText("Nome da Lotação *");
    const siglaInput = await screen.findByLabelText("Sigla *");

    fireEvent.change(nomeInput, {
      target: { value: "" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    // Espera até que a mensagem de erro seja exibida
    const errorMessage = await screen.findByText(
      "Certifique-se de que todos os campos obrigatórios estão preenchidos"
    );
    expect(errorMessage).toBeInTheDocument();

    // Fecha o Snackbar
    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    // Aguarda até que a mensagem de erro seja removida do DOM
    await waitFor(() =>
      expect(
        screen.queryByText(
          "Certifique-se de que todos os campos obrigatórios estão preenchidos"
        )
      ).not.toBeInTheDocument()
    );
    //Espera que a função de mandar pro banco não foi chamada
    expect(updateOrgan).not.toHaveBeenCalled();

    fireEvent.change(nomeInput, {
      target: { value: "Organ-Teste" },
    });

    fireEvent.change(lotInput, {
      target: { value: "Lotação1" },
    });

    fireEvent.change(siglaInput, {
      target: { value: "L1" },
    });

    await userEvent.click(screen.getByText("Salvar"));

    await waitFor(() => {
      expect(updateOrgan).toHaveBeenCalled();
    });

    waitFor(() => {
      expect(screen.getByText("Alterações salvas"));
      fireEvent.click(screen.getByText("OK"));
      expect(window.location.pathname).toBe("/organ/list");
    });
  });

  it("deletes organ correctly", async () => {
    render(
      <Router>
        <OrganId />
      </Router>
    );
    await userEvent.click(screen.getByText("Deletar"));

    expect(
      screen.getByText("Deseja deletar órgão do sistema?")
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText(/Excluir órgão/i));

    await waitFor(() => expect(deleteOrganById).toHaveBeenCalledTimes(1));

    waitFor(() => {
      expect(screen.getByText("Órgão excluído com sucesso!"));
      fireEvent.click(screen.getByText("OK"));
      expect(window.location.pathname).toBe("organ/list");
    });
  });
});
