import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MemberShip from "./";
import { listOrgans } from "../../../Services/organService";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../../Services/memberShipService", () => ({
  createMemberShip: vi.fn().mockResolvedValue("Success"),
}));

vi.mock("../../../Services/organService.js", () => ({
  listOrgans: vi.fn(),
}));

describe("MemberShip Component", () => {
  it("should render without crashing", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );
    expect(screen.getByText(/Formulário de Filiação/i)).toBeInTheDocument();
  });

  it("should call the service: listOrgans", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    expect(screen.getByText(/Formulário de Filiação/i)).toBeInTheDocument();
    expect(listOrgans).toHaveBeenCalled();
  });

  it("should update the name field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText(/Nome Completo/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    expect(nameInput.value).toBe("John Doe");
  });

  it("should update the religion field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const religionInput = screen.getByLabelText(/Religião/i);
    fireEvent.change(religionInput, { target: { value: "Umbanda" } });

    expect(religionInput.value).toBe("Umbanda");
  });

  it("should update the city field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const cityInput = screen.getByLabelText(/Naturalidade/i);
    fireEvent.change(cityInput, { target: { value: "Brasília" } });

    expect(cityInput.value).toBe("Brasília");
  });

  it("should update the issuing body field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const issuingBodyInput = screen.getByLabelText(/Órgão Expeditor/i);
    fireEvent.change(issuingBodyInput, { target: { value: "SSP" } });

    expect(issuingBodyInput.value).toBe("SSP");
  });

  it("should update the CPF field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const cpfInput = screen.getByLabelText(/CPF */i);
    fireEvent.change(cpfInput, { target: { value: "999.999.999-99" } });

    expect(cpfInput.value).toBe("999.999.999-99");
  });

  it("should update the father's name field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const fatherNameInput = screen.getByLabelText(/Nome do Pai/i);
    fireEvent.change(fatherNameInput, { target: { value: "Jhon Popins" } });

    expect(fatherNameInput.value).toBe("Jhon Popins");
  });

  it("should update the mother's name field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const motherNameInput = screen.getByLabelText(/Nome da Mãe/i);
    fireEvent.change(motherNameInput, { target: { value: "Mary Popins" } });

    expect(motherNameInput.value).toBe("Mary Popins");
  });

  it("should show an error if required fields are empty", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/ENVIAR SOLICITAÇÃO/i));

    expect(
      screen.getByText(
        /Certifique-se de que todos os campos obrigatórios estão preenchidos/i
      )
    ).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/Nome Completo/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    fireEvent.click(screen.getByText(/ENVIAR SOLICITAÇÃO/i));

    expect(
      screen.getByText(
        /Certifique-se de que todos os campos obrigatórios estão preenchidos/i
      )
    ).toBeInTheDocument();
  });

  it("should handle opening add a dependent correctly", async () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    // Click on the "Add Dependent" button
    const icon = screen.getByTestId("AddCircleOutlineIcon");
    fireEvent.click(icon);

    // Check if the dependent was added to the list
    expect(screen.getByLabelText(/Parentesco/i)).toBeInTheDocument();
  });

  it("should handle adding a dependent correctly", async () => {
    const { container } = render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    // 27 Entradas (não contando datas) antes da abertura do formulario de dependente
    let inputs = container.querySelectorAll(".MuiFilledInput-input");
    expect(inputs).toHaveLength(27);

    // Clicar no botão para abrir
    const icon = screen.getByTestId("AddCircleOutlineIcon");
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

  it("should handle deleting a dependent correctly", async () => {
    const { container } = render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    // Clicar no botão para abrir o formulário de dependente
    const icon = screen.getByTestId("AddCircleOutlineIcon");
    fireEvent.click(icon);

    // Esperar o form abrir para preencher
    const dependentForm = await waitFor(() =>
      container.querySelector(".dependentToAdd")
    );

    // Garantir que o form abriu
    if (!dependentForm) {
      throw new Error("Dependent form not found");
    }

    // Preencher
    let inputs = container.querySelectorAll(".MuiFilledInput-input");
    expect(inputs).toHaveLength(31);
    inputs = Array.from(inputs).slice(-4);
    fireEvent.change(inputs[0], { target: { value: "João Teste" } });
    fireEvent.change(inputs[1], { target: { value: "Filho" } });
    fireEvent.change(inputs[2], { target: { value: "123.456.789-01" } });
    fireEvent.change(inputs[3], { target: { value: "(11) 11111-1111" } });

    // Data de Nascimento
    const { getByPlaceholderText } = within(dependentForm);
    fireEvent.change(getByPlaceholderText(/DD\/MM\/YYYY/i), {
      target: { value: "01/01/2000" },
    });

    // Enviar o form
    fireEvent.click(screen.getByText(/Confirmar Dependente/i));

    // Verificar de o dependente foi adicionado
    await waitFor(() => {
      expect(screen.getByText(/Dependente 1/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/João Teste/i)).toBeInTheDocument();
    });

    // Achar e clicar no remover dependente
    const deleteButton = screen.getByText(/Remover Dependente/i);
    fireEvent.click(deleteButton);

    // Verificar que foi removido
    await waitFor(() => {
      expect(screen.queryByText(/Dependente 1/i)).not.toBeInTheDocument();
      expect(screen.queryByDisplayValue(/João Teste/i)).not.toBeInTheDocument();
    });
  });
});
