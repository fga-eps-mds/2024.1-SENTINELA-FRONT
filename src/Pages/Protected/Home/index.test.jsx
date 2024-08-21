import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Importar 'expect' explicitamente
import Home from "./index";

vi.mock("../../../Context/auth", () => ({
  useAuth: vi.fn().mockReturnValue({ user: {} }),
}));

vi.mock("../../../Services/userService", () => ({
  getUsers: vi.fn().mockResolvedValue([]),
}));

vi.mock("react-chartjs-2", () => ({
  Doughnut: () => <div>Mocked Doughnut Chart</div>,
}));

describe("Home Component", () => {
  it("renders without crashing", () => {
    render(<Home />);

    expect(screen.getByText("Filiados")).toBeInTheDocument();

    const doughnutCharts = screen.getAllByText("Mocked Doughnut Chart");
    expect(doughnutCharts).toHaveLength(2);

    expect(doughnutCharts[0]).toBeInTheDocument();
    expect(doughnutCharts[1]).toBeInTheDocument();
  });
});
