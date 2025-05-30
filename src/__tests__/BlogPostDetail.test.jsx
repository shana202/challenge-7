import React from "react";
import { render, screen } from "@testing-library/react";
import BlogPostDetail from "../components/BlogPostDetail/BlogPostDetail";

describe("BlogPostDetail", () => {
  const mockPost = {
    title: "Sample Blog Post",
    author: "Jane Doe",
    date: "2023-04-10",
    content: `
      <p>This is a <strong>sample</strong> blog post.</p>
      <h2>Section Title</h2>
      <ul>
        <li>Point one</li>
        <li>Point two</li>
      </ul>
    `,
  };

  test("renders title, author, date, and content", () => {
    render(<BlogPostDetail {...mockPost} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      mockPost.title
    );
    expect(screen.getByText(/By Jane Doe/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Published on April 10, 2023/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/sample blog post/i)).toBeInTheDocument();
    expect(screen.getByText(/Section Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Point one/i)).toBeInTheDocument();
    expect(screen.getByText(/Point two/i)).toBeInTheDocument();
  });

  test('renders "Blog post not found" if any prop is missing', () => {
    render(<BlogPostDetail title="" content="" author="" date="" />);
    expect(screen.getByText(/Blog post not found/i)).toBeInTheDocument();
  });

  test("renders formatted date correctly", () => {
    render(<BlogPostDetail {...mockPost} />);
    const dateElement = screen.getByText(/Published on/i);
    expect(dateElement).toHaveTextContent("April 10, 2023");
  });

  test("sanitizes script tags from content", () => {
    const maliciousContent = {
      title: "Hack Attempt",
      author: "Evil Hacker",
      date: "2023-01-01",
      content: '<p>Hello</p><script>alert("XSS")</script>',
    };

    const { container } = render(<BlogPostDetail {...maliciousContent} />);
    // Ensure script tag is not present
    const scriptTags = container.querySelectorAll("script");
    expect(scriptTags.length).toBe(0);
  });

  test("renders HTML content using dangerouslySetInnerHTML", () => {
    render(<BlogPostDetail {...mockPost} />);
    expect(screen.getByText("Point one")).toBeInTheDocument();
    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });
});
