import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import OrganId from "./index";
import "@testing-library/jest-dom";

describe("OrgansUpdate", () => {
  beforeEach(() => {
    vi.mock("../../../../Services/organService", () => {
      return {
        updateOrgan: vi.fn(),
        deleteOrganById: vi.fn(),
        getOrganById: vi.fn().mockResolvedValue({
          orgao: "NomeTeste",
          lotacao: [
            {
              nomeLotacao: "Lotação A",
              sigla: "LA",
            },
          ],
        }),
      };
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders correctly", async () => {
    render(
      <Router>
        <OrganId />
      </Router>
    );

    expect(screen).toMatchSnapshot();
    expect(screen.getByText("Editar Órgão")).toBeInTheDocument();
    expect(screen.getByText("Dados do Órgão")).toBeInTheDocument();
    expect(screen.getByText("Dados de Lotação")).toBeInTheDocument();
  });

  //   it("validate form before submit", async () => {
  //     render(
  //       <Router>
  //         <OrganId />
  //       </Router>
  //     );

  //     const nomeInput = screen.findByLabelText("Órgão *");
  //     fireEvent.change(nomeInput, {
  //         target: { value: "manue"},
  //     })

  //     await userEvent.click(screen.getByText("Salvar"));

  //   });
});
