import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BenefitsList from "./index";
import { getBenefitsForm } from "../../../../Services/benefitsService";

import "@testing-library/jest-dom";

vi.mock("../../../../Services/benefitsService");

describe("BenefitsList", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", async () => {
    getBenefitsForm.mockResolvedValue([]);

    render(
      <Router>
        <BenefitsList />
      </Router>
    );

    expect(screen.getByText("Lista de benefícios")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar benefício")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquisar benefícios")).toBeInTheDocument();

    await waitFor(() => expect(getBenefitsForm).toHaveBeenCalledTimes(1));
  });

  it("fetches and displays benefits", async () => {
    const benefits = [
      { _id: "1", nome: "Benefício 1" },
      { _id: "2", nome: "Benefício 2" },
    ];
    getBenefitsForm.mockResolvedValue(benefits);

    render(
      <Router>
        <BenefitsList />
      </Router>
    );

    await waitFor(() => expect(getBenefitsForm).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Benefício 1")).toBeInTheDocument();
    expect(screen.getByText("Benefício 2")).toBeInTheDocument();
  });

  it("filters benefits based on search input", async () => {
    const benefits = [
      { _id: "1", nome: "Benefício 1" },
      { _id: "2", nome: "Benefício 2" },
    ];
    getBenefitsForm.mockResolvedValue(benefits);

    render(
      <Router>
        <BenefitsList />
      </Router>
    );

    await waitFor(() => expect(getBenefitsForm).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByLabelText("Pesquisar benefícios");
    fireEvent.change(searchInput, { target: { value: "1" } });

    expect(screen.getByText("Benefício 1")).toBeInTheDocument();
    expect(screen.queryByText("Benefício 2")).not.toBeInTheDocument();
  });

  it("navigates to benefit creation page on button click", async () => {
    render(
      <Router>
        <BenefitsList />
      </Router>
    );

    fireEvent.click(screen.getByText(/Cadastrar benefício/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/beneficios/criar");
    });
  });

  it("navigates to benefit edit page on list item click", async () => {
    const benefits = [
      { _id: "1", nome: "Beneficio1" },
      { _id: "2", nome: "Beneficio2" },
    ];
    getBenefitsForm.mockResolvedValue(benefits);

    render(
      <Router>
        <BenefitsList />
      </Router>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Beneficio1"));
    });

    expect(window.location.pathname).toBe(
      `/beneficios/editar/${benefits[0].nome}`
    );
  });
});
