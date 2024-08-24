import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FinancialCreate from "./index";
import { createFinancialMovements, getUsers} from "../../../../Services/FinancialMovementsService/index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

async function fillUpRequiredFields() {
  const selects = screen.getAllByRole("combobox");
  const contaOrigemSelect = selects.find(
    (s) => s.id === "select-Conta origem *"
  );
  const contaDestinoSelect = selects.find(
    (s) => s.id === "select-Conta destino *"
  );
  const nomeOrigemSelect = selects.find((s) => s.id === "select-Nome origem *");
  const nomeDestinoSelect = selects.find(
    (s) => s.id === "select-Nome destino *"
  );
  const tipoDocSelect = selects.find((s) => s.id === "select-Tipo documento *");
  const fPagamentoSelect = selects.find(
    (s) => s.id === "select-Forma de pagamento *"
  );
  const dataVencimentoSelect = selects.find(
    (s) => s.label === "Data de vencimento *"
  );
  const dataPagamentoSelect = selects.find(
    (s) => s.label === "Data de pagamento *"
  );

  await userEvent.click(contaOrigemSelect);
  await userEvent.click(screen.getByRole("option", { name: "Sindicalizado" }));

  await userEvent.click(contaDestinoSelect);
  await userEvent.click(screen.getByRole("option", { name: "Sindicalizado" }));

  await userEvent.click(nomeOrigemSelect);
  await userEvent.click(screen.getByRole("option", { name: "John Doe" }));

  await userEvent.click(nomeDestinoSelect);
  await userEvent.click(screen.getByRole("option", { name: "John Doe" }));

  await userEvent.click(fPagamentoSelect);
  await userEvent.click(screen.getByRole("option", { name: "Dinheiro" }));

  await userEvent.click(tipoDocSelect);
  await userEvent.click(screen.getByRole("option", { name: "CELULAR" }));

  const valorInput = await screen.findByLabelText("Valor Bruto *");

  fireEvent.change(valorInput, { target: { value: "1000" } });

  fireEvent.change(dataVencimentoSelect, { target: { value: "01-01-2000" } });

  fireEvent.change(dataPagamentoSelect, { target: { value: "01-01-2000" } });
}

describe("FinancialCreate", () => {
  beforeEach(() => {
    vi.mock("../../../../Services/FinancialMovementsService/index", () => ({
        createFinancialMovements: vi.fn(),
        getUsers: vi.fn(() => Promise.resolve([{ name: "John Doe" }])),
      }));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(
      <Router>
        <FinancialCreate />
      </Router>
    );

    expect(screen).toMatchSnapshot();
  });

  it("validates form correctly before submiting with non required fields", async () => {

    render(
      <Router>
        <FinancialCreate />
      </Router>
    );

    //Tenta submeter o formulário sem preencher os campos obrigatórios
    await userEvent.click(screen.getByText("Cadastrar"));

    //Verifica se a mensagem de erro foi exibida
    expect(screen.getByText("Certifique-se de que todos os campos obrigatórios estão preenchidos")).toBeInTheDocument();

    //Verifica se a função de criação de movimentação financeira não foi chamada
    expect(createFinancialMovements).not.toHaveBeenCalled();

    //Fecha a mensagem de erro
    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    //Preenche os campos obrigatórios
    await fillUpRequiredFields();

    //Tenta submeter o formulário novamente
    await userEvent.click(screen.getByText("Cadastrar"));

    //Verifica se a função de criação de movimentação financeira foi chamada
    expect(createFinancialMovements).toHaveBeenCalledTimes(1);
  });

});
