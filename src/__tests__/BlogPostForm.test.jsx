import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogPostForm from "../components/BlogPostForm/BlogPostForm";

// Mock SunEditor
jest.mock("suneditor-react", () => {
  return function MockSunEditor({ onChange }) {
    return (
      <textarea
        data-testid="suneditor"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter content"
      />
    );
  };
});

// Mock ReactDatePicker
jest.mock("react-datepicker", () => {
  return function MockDatePicker({
    selected,
    onChange,
    dateFormat,
    className,
  }) {
    return (
      <input
        data-testid="datepicker"
        value={selected ? selected.toISOString().split("T")[0] : ""}
        onChange={(e) => {
          const date = new Date(e.target.value);
          onChange(date);
        }}
        placeholder="Select a date"
        className={className}
      />
    );
  };
});

describe("BlogPostForm", () => {
  const fillForm = () => {
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Filled Title" },
    });
    fireEvent.change(screen.getByTestId("suneditor"), {
      target: { value: "Filled Content" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Filled Author" },
    });
    fireEvent.change(screen.getByTestId("datepicker"), {
      target: { value: "2025-01-01" },
    });
  };

  it("renders form fields correctly", () => {
    render(<BlogPostForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByTestId("suneditor")).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByTestId("datepicker")).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    render(<BlogPostForm onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Content is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Author is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    });
  });

  it("calls onSubmit and resets form when post is empty object", async () => {
    const onSubmit = jest.fn();
    render(<BlogPostForm post={{}} onSubmit={onSubmit} />);

    fillForm();
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Filled Title",
        content: "Filled Content",
        author: "Filled Author",
        date: "2025-01-01",
      });
      expect(screen.getByLabelText(/Title/i)).toHaveValue("");
      expect(screen.getByLabelText(/Author/i)).toHaveValue("");
      expect(screen.getByTestId("datepicker")).toHaveValue("");
    });
  });

  it("shows success message after valid submit", async () => {
    const onSubmit = jest.fn();
    render(<BlogPostForm onSubmit={onSubmit} />);
    fillForm();
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByText(/Post created successfully/i)
      ).toBeInTheDocument();
    });
  });

  it("pre-fills form and shows 'Update Post' when post is provided", () => {
    const post = {
      title: "Test Title",
      content: "Test Content",
      author: "Jane",
      date: "2024-01-01",
    };

    render(<BlogPostForm post={post} onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/Title/i)).toHaveValue("Test Title");
    expect(screen.getByLabelText(/Author/i)).toHaveValue("Jane");
    expect(screen.getByTestId("datepicker")).toHaveValue("2024-01-01");
    expect(screen.getByRole("button")).toHaveTextContent("Update Post");
  });

  it("resets fields when post is undefined (create mode)", async () => {
    const onSubmit = jest.fn();
    render(<BlogPostForm post={undefined} onSubmit={onSubmit} />);

    fillForm();
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Filled Title",
        content: "Filled Content",
        author: "Filled Author",
        date: "2025-01-01",
      });
      expect(screen.getByLabelText(/Title/i)).toHaveValue("");
      expect(screen.getByLabelText(/Author/i)).toHaveValue("");
      expect(screen.getByTestId("datepicker")).toHaveValue("");
    });
  });

  it("resets fields when post is null (create mode)", async () => {
    const onSubmit = jest.fn();
    render(<BlogPostForm post={null} onSubmit={onSubmit} />);

    fillForm();
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Filled Title",
        content: "Filled Content",
        author: "Filled Author",
        date: "2025-01-01",
      });
      expect(screen.getByLabelText(/Title/i)).toHaveValue("");
      expect(screen.getByLabelText(/Author/i)).toHaveValue("");
      expect(screen.getByTestId("datepicker")).toHaveValue("");
    });
  });

  // New test to cover the false branch of line 41
  it("does not reset fields when post is a non-empty object (update mode)", async () => {
    const onSubmit = jest.fn();
    const initialPost = {
      title: "Initial Title",
      content: "Initial Content",
      author: "Initial Author",
      date: "2024-01-01",
    };
    render(<BlogPostForm post={initialPost} onSubmit={onSubmit} />);

    // Fill form with new values
    fillForm();
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Filled Title",
        content: "Filled Content",
        author: "Filled Author",
        date: "2025-01-01",
      });
      // Verify fields do NOT reset to empty
      expect(screen.getByLabelText(/Title/i)).toHaveValue("Filled Title");
      expect(screen.getByLabelText(/Author/i)).toHaveValue("Filled Author");
      expect(screen.getByTestId("datepicker")).toHaveValue("2025-01-01");
    });
  });
});
