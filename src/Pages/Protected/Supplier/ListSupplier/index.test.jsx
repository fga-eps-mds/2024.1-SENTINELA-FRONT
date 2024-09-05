import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ListSupplier from ".";
import { getSupplierForm } from "../../../../Services/supplierService";

import "@testing-library/jest-dom";

vi.mock("../../../../Services/supplierService");

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
    await waitFor(() => expect(getSupplierForm).toHaveBeenCalledTimes(1));
  });

  it("fetches and display suppliers", async () => {
    const suppliers = [
      { _id: "1", nome: "Fornecedor 1" },
      { _id: "2", nome: "Fornecedor 2" },
    ];
    getSupplierForm.mockResolvedValue(suppliers);

    render(
      <Router>
        <ListSupplier />
      </Router>
    );

    await waitFor(() => expect(getSupplierForm).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByLabelText("Pesquisar fornecedor");
    fireEvent.change(searchInput, { target: { value: "1" } });

    expect(screen.getByText("Fornecedor 1")).toBeInTheDocument();
    expect(screen.queryByText("Fornecedor 2")).not.toBeInTheDocument();
  });

  it("navigates to supplier edit page on list item click", async () => {
    const suppliers = [
      { _id: "1", nome: "Fornecedor 1" },
      { _id: "2", nome: "Fornecedor 2" },
    ];
    getSupplierForm.mockResolvedValue(suppliers);

    render(
      <Router>
        <ListSupplier />
      </Router>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Fornecedor 1"));
    });

    expect(decodeURIComponent(window.location.pathname)).toBe(
      `/fornecedores/${suppliers[0].nome}`
    );
  });
});
