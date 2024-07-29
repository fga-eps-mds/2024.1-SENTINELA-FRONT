import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PasswordRecovery from "./index";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("PasswordRecovery", () => {
  it("should render PasswordRecovery", () => {
    render(
      <BrowserRouter>
        <PasswordRecovery />
      </BrowserRouter>
    );

    expect(screen.getByText("Recuperar senha")).toBeInTheDocument();
  });
  it("should update email field", () => {
    render(
      <BrowserRouter>
        <PasswordRecovery />
      </BrowserRouter>
    );

    const emailField = screen.getByPlaceholderText("Digite seu email");

    fireEvent.change(emailField, { target: { value: "test@example.com" } });

    expect(emailField.value).toBe("test@example.com");
  });
});
