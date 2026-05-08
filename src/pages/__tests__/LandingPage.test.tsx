import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../LandingPage";

jest.mock("../../features/projects/hooks/useProjects", () => ({
  useProjects: () => ({
    status: "success",
    data: [
      {
        id: 2,
        slug: "zeeguu",
        title: "ITU - Zeeguu",
        description: "A language learning platform",
        technologies: ["React", "JavaScript"],
        link: "/zeeguu",
        isLinkExternal: false,
        imageSrc: "zeeguu-mockup.png",
      },
    ],
  }),
}));

jest.mock("../../utils/getAssetUrl", () => ({
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
});
