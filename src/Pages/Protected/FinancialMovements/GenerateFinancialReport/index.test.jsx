import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GenerateFinancialReport from "./index";
import "@testing-library/jest-dom";

describe("GenerateFinancialReport Component", () => {
  beforeEach(() => {
    // Mock the necessary services and hooks
    vi.mock("../../../../Services/supplierService", () => ({
      getSupplierForm: vi.fn().mockResolvedValue([]),
    }));
    vi.mock("../../../../Services/pdfService", () => ({
      generateFinancialReport: vi.fn().mockResolvedValue(true),
    }));
    vi.mock("../../../../Services/csvService", () => ({
      generateCSVReport: vi.fn().mockResolvedValue(true),
    }));
    vi.mock("../../../../Services/userService", () => ({
      getUsers: vi.fn().mockResolvedValue([]),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should render the component with all elements", () => {
    render(
      <Router>
        <GenerateFinancialReport />
      </Router>
    );

    expect(screen).toMatchSnapshot();
  });

  it("should trigger handleGenerateReport when the button is clicked", async () => {
    render(
      <Router>
        <GenerateFinancialReport />
      </Router>
    );

    const button = screen.getByText("Gerar relatório");
    button.click();

    // Check if the report generation functions were called
    expect(
      await screen.findByText("Gerar relatório financeiro")
    ).toBeInTheDocument();
  });
});
