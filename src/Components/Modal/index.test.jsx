import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Modal from "./index";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("Modal component", () => {
  const alertTitle = "Test Title";

  const renderModal = (props) =>
    render(
      <BrowserRouter>
        <Modal show={props.show} alertTitle={alertTitle}>
          <div>Modal Content</div>
        </Modal>
      </BrowserRouter>
    );

  it("does not render the modal when show prop is false", () => {
    renderModal({ show: false });
    expect(screen.queryByText(alertTitle)).not.toBeInTheDocument();
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("renders the modal when show prop is true", () => {
    renderModal({ show: true });
    expect(screen.getByText(alertTitle)).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });
});
