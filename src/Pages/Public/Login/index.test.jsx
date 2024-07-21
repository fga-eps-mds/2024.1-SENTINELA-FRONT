import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Login from "./index";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  it("should render login", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
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
