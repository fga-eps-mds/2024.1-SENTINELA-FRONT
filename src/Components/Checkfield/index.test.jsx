import { render, screen, fireEvent } from "@testing-library/react";
import CheckField from "./index";
import { expect } from "vitest";

describe("CheckField component", () => {
  it("renders with the provided label", () => {
    render(<CheckField label="Test Label" />);
    const label = screen.getByText("Test Label");
    expect(label).to.exist;
  });

  it("initially renders with the checkbox unchecked if 'checked' prop is false", () => {
    render(<CheckField label="Test Label" checked={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).to.be.false;
  });

  it("renders with the checkbox checked if 'checked' prop is true", () => {
    render(<CheckField label="Test Label" checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).to.be.true;
  });

  it("toggles checkbox state when clicked", () => {
    const onChange = vi.fn();
    render(
      <CheckField label="Test Label" checked={false} onChange={onChange} />
    );
    const checkbox = screen.getByRole("checkbox");

    // Initially unchecked
    expect(checkbox.checked).to.be.false;

    // Simulate click
    fireEvent.click(checkbox);

    // Should be checked after click
    expect(checkbox.checked).to.be.true;
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("applies the 'Mui-focused' class when the checkbox is checked", () => {
    render(<CheckField label="Test Label" checked={true} />);
    const container = screen.getByText("Test Label").parentElement;
    expect(container.classList.contains("Mui-focused")).to.be.true;
  });

  it("removes the 'Mui-focused' class when the checkbox is unchecked", () => {
    render(<CheckField label="Test Label" checked={false} />);
    const container = screen.getByText("Test Label").parentElement;
    expect(container.classList.contains("Mui-focused")).to.be.false;
  });
});
