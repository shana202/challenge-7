import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Comment from "../components/Comment/Comment";

describe("Comment", () => {
  const defaultComment = {
    name: "Alice",
    date: "2023-12-31T10:00:00Z",
    text: "This is a comment.",
    avatar: "https://example.com/avatar.jpg",
  };

  const fallbackAvatar =
    "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg";

  it("renders comment with name, formatted date, and text", () => {
    render(<Comment {...defaultComment} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText(/December 31, 2023/)).toBeInTheDocument();
    expect(screen.getByText("This is a comment.")).toBeInTheDocument();
  });

  it("renders avatar image when provided", () => {
    render(<Comment {...defaultComment} />);
    const avatarImg = screen.getByRole("img", { name: "Alice's avatar" });
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute("src", defaultComment.avatar);
  });

  it("uses fallback avatar if not provided", () => {
    render(<Comment name="Bob" text="Hi" date="2024-01-01T12:00:00Z" />);
    const avatarImg = screen.getByRole("img", { name: "Bob's avatar" });
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute("src", fallbackAvatar);
  });

  it("switches to fallback avatar when provided avatar fails to load", () => {
    const { rerender } = render(<Comment {...defaultComment} />);
    const avatarImg = screen.getByRole("img", { name: "Alice's avatar" });

    // Initially has the provided avatar
    expect(avatarImg).toHaveAttribute("src", defaultComment.avatar);

    // Simulate image load failure
    fireEvent.error(avatarImg);

    // After error, should switch to fallback
    expect(avatarImg).toHaveAttribute("src", fallbackAvatar);

    // Ensure onError is cleared to prevent infinite loop
    expect(avatarImg.onerror).toBeNull();

    // Rerender with same props shouldn't reset src
    rerender(<Comment {...defaultComment} />);
    expect(avatarImg).toHaveAttribute("src", fallbackAvatar);
  });
});
