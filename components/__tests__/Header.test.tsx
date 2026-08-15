import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  it("renders the brand link and nav links", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: /nafil estates/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Support" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
