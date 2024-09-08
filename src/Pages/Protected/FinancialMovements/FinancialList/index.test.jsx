import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FinancialList from "./index";
import { APIBank } from "../../../../Services/BaseService";

import "@testing-library/jest-dom";

vi.mock("../../../../Services/BaseService");

vi.mock("../../../../Utils/permission", () => ({
  usePermissions: () => ({
    somePermission: true,
  }),
  checkAction: () => true,
}));

describe("FinancialList", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", async () => {
    APIBank.get.mockResolvedValue({ data: [] });

    render(
      <Router>
        <FinancialList />
      </Router>
    );

    expect(screen.getByText("Lista de movimentações")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar movimentação")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquisar movimentação")).toBeInTheDocument();

    await waitFor(() => expect(APIBank.get).toHaveBeenCalledTimes(1));
  });

  it("fetches and displays financial movements", async () => {
    const movements = [
      {
        _id: "1",
        tipoDocumento: "Receita",
        datadePagamento: "2024-08-01T00:00:00Z",
        descricao: "Movimento 1",
      },
      {
        _id: "2",
        tipoDocumento: "Despesa",
        datadePagamento: "2024-08-02T00:00:00Z",
        descricao: "Movimento 2",
      },
    ];
    APIBank.get.mockResolvedValue({ data: movements });

    render(
      <Router>
        <FinancialList />
      </Router>
    );

    await waitFor(() => expect(APIBank.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Receita")).toBeInTheDocument();
    expect(screen.getByText("Despesa")).toBeInTheDocument();
  });

  it("filters financial movements based on search input", async () => {
    const movements = [
      {
        _id: "1",
        tipoDocumento: "Receita",
        datadePagamento: "2024-08-01T00:00:00Z",
        descricao: "Movimento 1",
      },
      {
        _id: "2",
        tipoDocumento: "Despesa",
        datadePagamento: "2024-08-02T00:00:00Z",
        descricao: "Movimento 2",
      },
    ];
    APIBank.get.mockResolvedValue({ data: movements });

    render(
      <Router>
        <FinancialList />
      </Router>
    );

    await waitFor(() => expect(APIBank.get).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByLabelText("Pesquisar movimentação");
    fireEvent.change(searchInput, { target: { value: "Receita" } });

    expect(screen.getByText("Receita")).toBeInTheDocument();
    expect(screen.queryByText("Despesa")).not.toBeInTheDocument();
  });

  it("navigates to financial movement creation page on button click", async () => {
    render(
      <Router>
        <FinancialList />
      </Router>
    );

    fireEvent.click(screen.getByText(/Cadastrar movimentação/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/movimentacoes/criar");
    });
  });

  it("navigates to financial movement detail page on list item click", async () => {
    const movements = [
      {
        _id: "1",
        tipoDocumento: "Receita",
        datadePagamento: "2024-08-01T00:00:00Z",
        descricao: "Movimento 1",
      },
      {
        _id: "2",
        tipoDocumento: "Despesa",
        datadePagamento: "2024-08-02T00:00:00Z",
        descricao: "Movimento 2",
      },
    ];
    APIBank.get.mockResolvedValue({ data: movements });

    render(
      <Router>
        <FinancialList />
      </Router>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Receita"));
    });

    expect(window.location.pathname).toBe(
      `/movimentacoes/visualizar/${movements[0]._id}`
    );
  });
});
