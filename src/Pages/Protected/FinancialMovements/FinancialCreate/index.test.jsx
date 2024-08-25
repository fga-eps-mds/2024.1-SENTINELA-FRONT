import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FinancialCreate from "./index";

import "@testing-library/jest-dom";

describe("FinancialCreate", () => {
  const theme = createTheme(); // Cria um tema padrão do MUI

  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders the FinancialCreate page", () => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <FinancialCreate />
        </Router>
      </ThemeProvider>
    );

    // Verifica se a página contém um título ou elemento específico que confirma a renderização
    expect(
      screen.getByText("Cadastro de Movimentações Financeiras")
    ).toBeInTheDocument();
  });
});
