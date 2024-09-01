import React from "react";
import { render, screen } from "@testing-library/react";
import Unauthorized from "./index";

describe("Unauthorized Page", () => {
  it("should render the Unauthorized page with correct content", () => {
    render(<Unauthorized />);

    const titleElement = screen.getByRole("heading", {
      name: /acesso negado/i,
    });
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = screen.getByText(
      /você não tem permissão para acessar esta página/i
    );
    expect(paragraphElement).toBeInTheDocument();
  });
});
