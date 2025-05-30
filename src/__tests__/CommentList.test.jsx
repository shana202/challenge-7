import React from "react";
import { render, screen } from "@testing-library/react";
import CommentList from "../components/CommentList/CommentList";

describe("CommentList", () => {
  it("displays 'No comments yet' if empty", () => {
    render(<CommentList comments={[]} />);
    expect(screen.getByText(/No comments yet/i)).toBeInTheDocument();
  });

  it("renders a list of comments", () => {
    const comments = [
      {
        id: 1,
        name: "Alice",
        text: "First comment",
        date: "2023-01-01T10:00:00Z",
      },
      {
        id: 2,
        name: "Bob",
        text: "Second comment",
        date: "2023-01-02T12:00:00Z",
      },
    ];
    render(<CommentList comments={comments} />);
    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("Second comment")).toBeInTheDocument();
  });
});
