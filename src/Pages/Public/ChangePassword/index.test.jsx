import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ChangePassword from "./index";

describe("ChangePassowrd", () => {
  it("should render ChangePassword", () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    );

    expect(screen.getByText("CONFIRMAÇÃO DE SENHA")).toBeInTheDocument();
  });
  it("should update senha field", () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    );

    const passwordField = screen.getByPlaceholderText("Digite sua nova senha");

    fireEvent.change(passwordField, { target: { value: "password" } });

    expect(passwordField.value).toBe("password");
  });
});
