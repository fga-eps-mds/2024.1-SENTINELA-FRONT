import { render, screen, within, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Home from "./index";

vi.mock("../../../Context/auth", () => ({
  useAuth: vi.fn().mockReturnValue({ user: {} }),
}));

//Entrada de dados
vi.mock("../../../Services/userService", () => ({
  getUsers: vi.fn().mockResolvedValue([
    { status: true, lotacao: "Lotacao 1", orgao: "Orgao 1", sex: "Masculino" },
    { status: true, lotacao: "Lotacao 1", orgao: "Orgao 2", sex: "Feminino" },
    { status: false, lotacao: "Lotacao 2", orgao: "Orgao 1", sex: "Masculino" },
    { status: false, lotacao: "Lotacao 2", orgao: "Orgao 2", sex: "Feminino" },
    { status: true, lotacao: "Lotacao 3", orgao: "Orgao 1", sex: "Masculino" },
  ]),
}));

vi.mock("react-chartjs-2", () => ({
  Doughnut: () => <div>Mocked Doughnut Chart</div>,
}));

describe("Home Component", () => {
  it("renders without crashing", async () => {
    await waitFor(() => render(<Home />));

    expect(screen.getByText("Filiados")).toBeInTheDocument();
    expect(screen.getByText("Divisão de sexo por lotação")).toBeInTheDocument();
    expect(
      screen.getByText("Divisão de lotação por órgão")
    ).toBeInTheDocument();

    const doughnutCharts = screen.getAllByText("Mocked Doughnut Chart");
    expect(doughnutCharts).toHaveLength(2);
    expect(doughnutCharts[0]).toBeInTheDocument();
    expect(doughnutCharts[1]).toBeInTheDocument();

    const filiadosSection = screen.getByText("Filiados").closest("div");
    expect(within(filiadosSection).getByText(/Filtro/i)).toBeInTheDocument();
    const donutBox = screen
      .getByText("Divisão de sexo por lotação")
      .closest("div");
    expect(
      within(donutBox).getByText(/Filtro de Lotação/i)
    ).toBeInTheDocument();

    const donutBox2 = screen
      .getByText("Divisão de lotação por órgão")
      .closest("div");
    expect(within(donutBox2).getByText(/Filtro de Órgão/i)).toBeInTheDocument();

    expect(screen.getByText("Limpar Filtros")).toBeInTheDocument();
  });
});
