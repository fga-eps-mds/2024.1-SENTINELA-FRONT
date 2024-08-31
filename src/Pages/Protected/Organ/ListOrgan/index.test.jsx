import { listOrgans } from "../../../../Services/organService";
import OrganList from ".";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import "@testing-library/jest-dom";

vi.mock("../../../../Services/organService");

describe("OrganList", () => {
  beforeEach(() => {
    localStorage.setItem("@App:user", JSON.stringify({ token: "mock-token" }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly", async () => {
    listOrgans.mockResolvedValue({});

    render(
      <Router>
        <OrganList />
      </Router>
    );

    expect(screen).toMatchSnapshot();
    expect(screen.getByText("Lista de órgãos")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar órgão")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquisar órgão")).toBeInTheDocument();

    await waitFor(() => expect(listOrgans).toHaveBeenCalledTimes(1));
  });

  it("filters organs based on search input", async () => {
    const organs = [
      { _id: "1", orgao: "Órgão 1" },
      { _id: "2", orgao: "Órgão 2" },
    ];
    listOrgans.mockResolvedValue(organs);

    render(
      <Router>
        <OrganList />
      </Router>
    );

    await waitFor(() => expect(listOrgans).toHaveBeenCalledTimes(1));
    const searchInput = screen.getByLabelText("Pesquisar órgão");
    fireEvent.change(searchInput, { target: { value: "1" } });

    expect(screen.getByText("Órgão 1")).toBeInTheDocument();
    expect(screen.queryByText("Órgão 2")).not.toBeInTheDocument();
  });

  it("navigates to organs creation page on button click", async () => {
    render(
      <Router>
        <OrganList />
      </Router>
    );

    fireEvent.click(screen.getByText(/Cadastrar Órgão/i));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/organ/create");
    });
  });

  it("navigates to organs edit page on list item click", async () => {
    const organs = [
      { _id: "1", orgao: "Órgão1" },
      { _id: "2", orgao: "Órgão2" },
    ];
    listOrgans.mockResolvedValue(organs);

    render(
      <Router>
        <OrganList />
      </Router>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Órgão1"));
    });

    expect(decodeURIComponent(window.location.pathname)).toBe(
      `/organ/update/${organs[0].orgao}`
    );
  });
});
