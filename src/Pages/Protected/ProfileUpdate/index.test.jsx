import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ProfileUpdate from "./index";
import { getUserById } from "../../../Services/userService";
import "@testing-library/jest-dom";

vi.mock("../../../Services/userService", () => ({
  getUserById: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => ({
      state: { userId: "123" },
    }),
    useNavigate: vi.fn(),
  };
});

describe("ProfileUpdate Page", () => {
  const setup = () => {
    return render(
      <Router>
        <ProfileUpdate />
      </Router>
    );
  };

  beforeEach(() => {
    localStorage.setItem(
      "@App:user",
      JSON.stringify({ _id: "user123", token: "mock-token" })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders ProfileUpdate page correctly", async () => {
    getUserById.mockResolvedValue({
      name: "Test User",
      phone: "(12) 34567-8910",
      email: "testuser@example.com",
      status: true,
      role: { _id: "admin" },
    });

    setup();

    expect(screen.getByText("Visualização de usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome*")).toBeInTheDocument();
    expect(screen.getByLabelText("Celular")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
      expect(screen.getByDisplayValue("(12) 34567-8910")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("testuser@example.com")
      ).toBeInTheDocument();
    });
  });

  it("should display validation errors for invalid email and phone number", async () => {
    setup();

    fireEvent.change(screen.getByLabelText("Celular"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "invalidemail" },
    });

    fireEvent.click(screen.getByText("Salvar"));

    await waitFor(() => {
      expect(screen.getByText("*Insira um celular válido")).toBeInTheDocument();
      expect(screen.getByText("*Insira um email válido")).toBeInTheDocument();
    });
  });
});
