import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MemberShip from "./";
import { BrowserRouter } from "react-router-dom";
import { createMemberShip } from "../../../Services/MemberShipService";
import Modal from "../../../Components/Modal";

vi.mock("../../../Services/MemberShipService", () => ({
  createMemberShip: vi.fn().mockResolvedValue("Success"),
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

  it("should show an error if required fields are empty", () => {
    render(
      <BrowserRouter>
        <MemberShip />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/ENVIAR SOLICITAÇÃO/i));

    expect(
      screen.getByText(
        /Certifique-se de que todos os campos estão preenchidos/i
      )
    ).toBeInTheDocument();
  });
});
