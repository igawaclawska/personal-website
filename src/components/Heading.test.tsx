import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading", () => {
  it("renders an h1 by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it.each([1, 2, 3, 4, 5, 6] as const)(
    "renders an h%i when level=%i",
    (level) => {
      render(<Heading level={level}>Level {level}</Heading>);
      expect(screen.getByRole("heading", { level })).toBeInTheDocument();
    },
  );

  it("renders children text", () => {
    render(<Heading>Hello World</Heading>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies underline class when isUnderlined is true", () => {
    render(<Heading isUnderlined>Underlined</Heading>);
    expect(screen.getByRole("heading").className).toContain("underline");
  });

  it("applies primaryColor class when primaryColor is true", () => {
    render(<Heading primaryColor>Colored</Heading>);
    expect(screen.getByRole("heading").className).toContain("primaryColor");
  });

  it("applies alignment class for left alignment", () => {
    render(<Heading alignment="left">Left</Heading>);
    expect(screen.getByRole("heading").className).toContain("alignLeft");
  });
});
