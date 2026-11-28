import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../LandingPage";

jest.mock("../../features/projects/hooks/useProjects", () => ({
  useProjects: () => ({
    status: "success",
    data: [
      {
        id: 2,
        kind: "internal",
        slug: "zeeguu",
        title: "ITU - Zeeguu",
        description: "A language learning platform",
        technologies: ["React", "JavaScript"],
        imageSrc: "zeeguu-mockup.png",
      },
      {
        id: 3,
        kind: "external",
        url: "https://www.opeepl.com/",
        title: "Opeepl - Website Design",
        description: "A website redesign",
        technologies: ["Figma"],
        imageSrc: "opeepl-mockup.png",
      },
    ],
  }),
}));

jest.mock("../../shared/utils/getAssetUrl", () => ({
  getAssetUrl: () => "",
}));

jest.mock("../../assets/profile-photo-mini.png", () => "profile-photo.png");

const renderLandingPage = () =>
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

describe("LandingPage", () => {
  it("renders the hero heading", () => {
    renderLandingPage();
    expect(
      screen.getByRole("heading", {
        name: /I develop user-first digital experiences/i,
      })
    ).toBeInTheDocument();
  });

  it("renders the Selected Work section heading", () => {
    renderLandingPage();
    expect(
      screen.getByRole("heading", { name: /Selected Work/i })
    ).toBeInTheDocument();
  });

  it("renders a project card for each project", async () => {
    renderLandingPage();
    await waitFor(() => {
      expect(screen.getByText("ITU - Zeeguu")).toBeInTheDocument();
    });
  });

  it("renders project technologies", async () => {
    renderLandingPage();
    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  it("links internal projects to their page and external ones to their site", () => {
    renderLandingPage();
    const [internal, external] = screen.getAllByRole("link", {
      name: /Learn more about this project/i,
    });
    expect(internal).toHaveAttribute("href", "/zeeguu");
    expect(internal).not.toHaveAttribute("target");
    expect(external).toHaveAttribute("href", "https://www.opeepl.com/");
    expect(external).toHaveAttribute("target", "_blank");
  });
});
