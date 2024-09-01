// src/Pages/Protected/Unauthorized/index.test.jsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Unauthorized from "./index";
import "@testing-library/jest-dom";

describe("Unauthorized Page", () => {
  beforeEach(() => {
    // Qualquer configuração necessária antes de cada teste
  });

  it("renders the Unauthorized page with correct content", () => {
    // Renderiza o componente Unauthorized dentro de um Router
    render(
      <Router>
        <Unauthorized />
      </Router>
    );

    // Verifica se o título "Acesso Negado" está na tela
    const titleElement = screen.getByRole("heading", { name: /acesso negado/i });
    expect(titleElement).toBeInTheDocument();

    // Verifica se o parágrafo de permissão está na tela
    const paragraphElement = screen.getByText(/você não tem permissão para acessar esta página/i);
    expect(paragraphElement).toBeInTheDocument();
  });
});
