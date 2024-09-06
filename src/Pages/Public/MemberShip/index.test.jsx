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

  it("should update the phone number field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const phoneInput = screen.getByLabelText(/Celular */i);
    fireEvent.change(phoneInput, { target: { value: "(99) 99999-9999" } });

    expect(phoneInput.value).toBe("(99) 99999-9999");
  });

  it("should update the cellular number field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const phoneInput = screen.getByLabelText(/Telefone/i);
    fireEvent.change(phoneInput, { target: { value: "(99) 99999-9999" } });

    expect(phoneInput.value).toBe("(99) 99999-9999");
  });

  it("should update the CEP number field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const cepInput = screen.getByLabelText(/CEP/i);
    fireEvent.change(cepInput, { target: { value: "99999-999" } });

    expect(cepInput.value).toBe("99999-999");
  });

  it("should update the town field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const townInput = screen.getByLabelText(/Cidade/i);
    fireEvent.change(townInput, { target: { value: "Gama" } });

    expect(townInput.value).toBe("Gama");
  });

  it("should update the adress field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const adressInput = screen.getByLabelText(/Logradouro/i);
    fireEvent.change(adressInput, {
      target: { value: "St. Leste, Gama Leste Projeção A" },
    });

    expect(adressInput.value).toBe("St. Leste, Gama Leste Projeção A");
  });

  it("should update the additional adress field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const addAdressInput = screen.getByLabelText(/Complemento/i);
    fireEvent.change(addAdressInput, {
      target: { value: "Próximo à estação do BRT Gama" },
    });

    expect(addAdressInput.value).toBe("Próximo à estação do BRT Gama");
  });

  it("should update the title field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText(/Cargo/i);
    fireEvent.change(titleInput, { target: { value: "Policial Penal" } });

    expect(titleInput.value).toBe("Policial Penal");
  });

  it("should update the workstation field correctly", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const workstationInput = screen.getByLabelText(/Posto de Trabalho/i);
    fireEvent.change(workstationInput, { target: { value: "Policial Penal" } });

    expect(workstationInput.value).toBe("Policial Penal");
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

  it("should handle close add a dependent correctly", async () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );

    const icon = screen.getByTestId("AddCircleOutlineIcon");
    fireEvent.click(icon);
    expect(screen.getByLabelText(/Parentesco/i)).toBeInTheDocument();

    fireEvent.click(icon);
    expect(screen.queryByLabelText(/Parentesco/i)).not.toBeInTheDocument();
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
