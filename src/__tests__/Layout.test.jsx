// src/__tests__/Layout.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../components/Layout/Layout";

// Mock the NavBar component to avoid testing it here
jest.mock("../components/NavBar/NavBar", () => () => <nav>MockNavBar</nav>);

describe("Layout", () => {
  it("renders the NavBar", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText("MockNavBar")).toBeInTheDocument();
  });

  it("renders children inside the main tag", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders the footer with correct text", () => {
    render(
      <Layout>
        <div>Any Content</div>
      </Layout>
    );
    expect(
      screen.getByText(/© 2025 BlogApp\. All rights reserved\./i)
    ).toBeInTheDocument();
  });
});
