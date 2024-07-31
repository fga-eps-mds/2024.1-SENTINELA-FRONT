import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Login from "./index";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  it("should render email and password input fields", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Digite seu email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
  });

  it("should render login button and it should be enabled", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const loginButton = screen.getByText("Entrar");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeEnabled();
  });

  it("should render forgot password button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const forgotPasswordButton = screen.getByText("Esqueci a senha");
    expect(forgotPasswordButton).toBeInTheDocument();
  });

  it("should render secondary button with text 'Filiar-me ao sindicato'", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const secondaryButton = screen.getByText("Filiar-me ao sindicato");
    expect(secondaryButton).toBeInTheDocument();
  });

  it("should update email field", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailField = screen.getByPlaceholderText("Digite seu email");

    fireEvent.change(emailField, { target: { value: "test@example.com" } });

    expect(emailField.value).toBe("test@example.com");
  });
  it("should update password field", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordField = screen.getByPlaceholderText("Digite sua senha");

    fireEvent.change(passwordField, { target: { value: "password123" } });

    expect(passwordField.value).toBe("password123");
  });
});
