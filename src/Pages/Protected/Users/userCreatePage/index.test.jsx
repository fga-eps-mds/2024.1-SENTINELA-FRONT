import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserCreatePage from "./index";
import { createUser, getRoles } from "../../../../Services/userService";
import "@testing-library/jest-dom";

vi.mock("../../../../Services/userService");

describe("UserCreatePage", () => {
  beforeEach(() => {
    getRoles.mockResolvedValue([
      { _id: "1", name: "Admin" },
      { _id: "2", name: "User" },
    ]);
  });

  it("renders the form correctly", async () => {
    render(
      <Router>
        <UserCreatePage />
      </Router>
    );

    expect(screen.getByText("Cadastro de usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome Completo*")).toBeInTheDocument();
    expect(screen.getByLabelText("Celular*")).toBeInTheDocument();
    expect(screen.getByLabelText("Status*")).toBeInTheDocument();
    expect(screen.getByLabelText("Email*")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();

    await screen.findByLabelText("Admin");
    expect(screen.getByLabelText("Admin")).toBeInTheDocument();
    expect(screen.getByLabelText("User")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    createUser.mockResolvedValue({
      data: { message: "Cadastro de usuário concluído" },
    });

    render(
      <Router>
        <UserCreatePage />
      </Router>
    );

    const emailInput = screen.getByLabelText("Email*");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(screen.getByText("*Insira um email válido")).toBeInTheDocument();
    });

    expect(createUser).not.toHaveBeenCalled();
  });

  it("validates phone number format", async () => {
    render(
      <Router>
        <UserCreatePage />
      </Router>
    );

    const phoneInput = screen.getByLabelText("Celular*");
    fireEvent.change(phoneInput, { target: { value: "123" } });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "*Verifique se o número de celular inserido está completo"
        )
      ).toBeInTheDocument();
    });

    expect(createUser).not.toHaveBeenCalled();
  });
});
