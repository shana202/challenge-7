import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import CommentForm from "../components/CommentForm/CommentForm";

describe("CommentForm", () => {
  const submitMock = jest.fn();

  beforeEach(() => {
    submitMock.mockClear();
  });

  it("renders all fields for anonymous users", () => {
    render(<CommentForm onSubmit={submitMock} isLoggedIn={false} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Avatar URL/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("hides name field for logged-in users", () => {
    render(
      <CommentForm
        onSubmit={submitMock}
        isLoggedIn={true}
        userName="TestUser"
      />
    );
    expect(screen.queryByLabelText(/Name/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Avatar URL/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

 

  it("shows error when submitting whitespace-only fields", async () => {
    render(<CommentForm onSubmit={submitMock} isLoggedIn={false} />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Name/i), {
        target: { value: "   " },
      });
      fireEvent.change(screen.getByLabelText(/Comment/i), {
        target: { value: "   " },
      });
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(
      () => {
        expect(
          screen.getByText("Please fill out all required fields.")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    expect(submitMock).not.toHaveBeenCalled();
  });

  it("submits correct data for anonymous user", () => {
    render(<CommentForm onSubmit={submitMock} isLoggedIn={false} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: "Great post!" },
    });
    fireEvent.change(screen.getByLabelText(/Avatar URL/i), {
      target: { value: "https://example.com/john.jpg" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(submitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        name: "John",
        text: "Great post!",
        avatar: "https://example.com/john.jpg",
        date: expect.any(String),
      })
    );
    expect(screen.getByLabelText(/Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Comment/i)).toHaveValue("");
    expect(screen.getByLabelText(/Avatar URL/i)).toHaveValue("");
  });

  it("submits correct data for logged-in user", () => {
    render(
      <CommentForm onSubmit={submitMock} isLoggedIn={true} userName="Jane" />
    );

    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: "Nice article!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(submitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        name: "Jane",
        text: "Nice article!",
        avatar: undefined,
        date: expect.any(String),
      })
    );
    expect(screen.getByLabelText(/Comment/i)).toHaveValue("");
    expect(screen.getByLabelText(/Avatar URL/i)).toHaveValue("");
  });

  it("submits without avatar for anonymous user", () => {
    render(<CommentForm onSubmit={submitMock} isLoggedIn={false} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Bob" },
    });
    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: "Cool!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(submitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        name: "Bob",
        text: "Cool!",
        avatar: undefined,
        date: expect.any(String),
      })
    );
  });

});
