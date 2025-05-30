import React, { useRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";

describe("ConfirmationDialog", () => {
  const setup = (props = {}) => {
    const triggerRef = React.createRef();
    const defaultProps = {
      isOpen: true,
      onClose: jest.fn(),
      onConfirm: jest.fn(),
      triggerRef,
      ...props,
    };

    render(
      <>
        <button ref={triggerRef}>Delete</button>
        <ConfirmationDialog {...defaultProps} />
      </>
    );
    return { ...defaultProps, triggerRef };
  };

  it("does not render when isOpen is false", () => {
    render(
      <ConfirmationDialog
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog with title and description", () => {
    setup();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure you want to delete this post/i)
    ).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByText(/cancel/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when Delete is clicked", () => {
    const { onConfirm } = setup();
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[1]); // The one inside the modal
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking outside the dialog", () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByTestId("overlay"));
    expect(onClose).toHaveBeenCalled();
  });

  it("does not close when clicking inside the dialog", () => {
    const { onClose } = setup();
    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("focuses the dialog on open", () => {
    setup();
    const dialog = screen.getByRole("dialog");
    expect(document.activeElement).toBe(dialog);
  });

  it("calls onClose when Escape key is pressed", () => {
    const { onClose } = setup();
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when a different key is pressed", () => {
    const { onClose } = setup();
    fireEvent.keyDown(window, { key: "Enter", code: "Enter" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("restores focus to triggerRef after modal closes", () => {
    const triggerRef = React.createRef();

    const { rerender } = render(
      <>
        <button ref={triggerRef}>Delete</button>
        <ConfirmationDialog
          isOpen={true}
          onClose={() => {}}
          onConfirm={() => {}}
          triggerRef={triggerRef}
        />
      </>
    );

    // Verify dialog gets focus first
    const dialog = screen.getByRole("dialog");
    expect(document.activeElement).toBe(dialog);

    // Now close modal by setting isOpen to false
    rerender(
      <>
        <button ref={triggerRef}>Delete</button>
        <ConfirmationDialog
          isOpen={false}
          onClose={() => {}}
          onConfirm={() => {}}
          triggerRef={triggerRef}
        />
      </>
    );

    expect(document.activeElement).toBe(triggerRef.current);
  });

  it("handles cleanup when triggerRef is not provided", () => {
    const triggerRef = { current: null }; // Simulate no trigger element
    const onClose = jest.fn();
    const { rerender } = render(
      <ConfirmationDialog
        isOpen={true}
        onClose={onClose}
        onConfirm={() => {}}
        triggerRef={triggerRef}
      />
    );

    // Verify dialog opens
    const dialog = screen.getByRole("dialog");
    expect(document.activeElement).toBe(dialog);

    // Close the dialog
    rerender(
      <ConfirmationDialog
        isOpen={false}
        onClose={onClose}
        onConfirm={() => {}}
        triggerRef={triggerRef}
      />
    );

    // No focus restoration should occur, and no errors should be thrown
    expect(document.activeElement).not.toBe(triggerRef.current); // Should be body or null
  });
});
