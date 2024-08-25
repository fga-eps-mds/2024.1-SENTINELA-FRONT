import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FinancialUpdate from "./index";

const theme = createTheme();

describe("FinancialUpdate", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders the FinancialUpdate page", () => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <FinancialUpdate />
        </Router>
      </ThemeProvider>
    );

    expect(screen).toMatchSnapshot();
  });

  it("should render modals", () => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <FinancialUpdate />
        </Router>
      </ThemeProvider>
    );

    expect(screen).toMatchSnapshot();
  });
});
