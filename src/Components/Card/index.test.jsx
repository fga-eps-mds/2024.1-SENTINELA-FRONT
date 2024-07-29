import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./index";
import { BrowserRouter } from "react-router-dom";

describe("Card component", () => {
  it("renders the Card component with children", () => {
    render(
      <BrowserRouter>
        <Card>
          <p>teste</p>
        </Card>
      </BrowserRouter>
    );

    // Verifica se os logos estão sendo renderizados
    expect(screen.getByAltText("Sindpol Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Sentinela Logo")).toBeInTheDocument();

    // Verifica se o conteúdo filho está sendo renderizado
    expect(screen.getByText("teste")).toBeInTheDocument();
  });

  it("applies the className prop", () => {
    const className = "custom-class";
    const { container } = render(
      <BrowserRouter>
        <Card className={className} />
      </BrowserRouter>
    );

    // Verifica se a classe customizada foi aplicada
    const cardElement = container.querySelector(".card");
    expect(cardElement).toHaveClass(className);
  });
});
