import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ListSupplier from ".";

import "@testing-library/jest-dom";

vi.mock("../../../Services/supplierService");

describe("ListSupplier", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-tocken" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", async () => {
    render(
      <Router>
        <ListSupplier />
      </Router>
    );

    expect(screen).toMatchSnapshot();
    expect(screen.getByText("Lista de fornecedores")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquisar fornecedor")).toBeInTheDocument();
  });
});
