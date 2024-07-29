import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import TextDisplay from "../../src/Components/TextDisplay";

describe("TextDisplay Component", () => {
  it("renders the textarea with the correct text", () => {
    render(<TextDisplay text="Hello, World!" />);

    const textbox = screen.getByRole("textbox");
    expect(textbox).toBeInTheDocument();
    expect(textbox).toHaveTextContent("Hello, World!");
  });
});
