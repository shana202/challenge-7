// src/__tests__/DeleteButton.test.jsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteButton from "../components/DeleteButton/DeleteButton";

describe("DeleteButton", () => {
  it("renders with 'Delete' text", () => {
    render(<DeleteButton onClick={() => {}} />);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<DeleteButton onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is focusable and accessible", () => {
    render(<DeleteButton onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /delete/i });
    button.focus();
    expect(button).toHaveFocus();
  });
});
