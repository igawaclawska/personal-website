import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectPage from "../ProjectPage";
import type { Project, ProjectDetail } from "../../features/projects/types";

const mockProject: Project = {
  id: 2,
  slug: "zeeguu",
  title: "ITU - Zeeguu",
  description: "A language learning platform",
  technologies: ["React"],
  link: "/zeeguu",
  isLinkExternal: false,
  imageSrc: "zeeguu-mockup.png",
};

const mockDetail: ProjectDetail = {
  slug: "zeeguu",
  sections: [],
};

jest.mock("../../features/projects/hooks/useProject", () => ({
  useProject: (slug: string) =>
    slug === "zeeguu"
      ? { status: "success", data: mockProject }
      : { status: "not-found" },
}));

jest.mock("../../features/projects/hooks/useProjectDetail", () => ({
  useProjectDetail: (slug: string) =>
    slug === "zeeguu"
      ? { status: "success", data: mockDetail }
      : { status: "not-found" },
}));

const renderAtRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:slug" element={<ProjectPage />} />
      </Routes>
    </MemoryRouter>
  );

describe("ProjectPage", () => {
  it("renders the project title for a known slug", async () => {
    renderAtRoute("/zeeguu");
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 1, name: "ITU - Zeeguu" })
      ).toBeInTheDocument();
    });
  });

  it("renders the project description", async () => {
    renderAtRoute("/zeeguu");
    await waitFor(() => {
      expect(
        screen.getByText("A language learning platform")
      ).toBeInTheDocument();
    });
  });

  it("shows not found for an unknown slug", async () => {
    renderAtRoute("/unknown-project");
    await waitFor(() => {
      expect(screen.getByText(/Project not found/i)).toBeInTheDocument();
    });
  });
});
