import { getProjectBySlug } from "../getProjectBySlug";
import type { ProjectRepository } from "../../repositories/types";
import type { Project } from "../../types";

const mockProject: Project = {
  id: 2,
  slug: "zeeguu",
  title: "ITU - Zeeguu",
  description: "A language learning platform",
  technologies: ["React", "JavaScript"],
  link: "/zeeguu",
  isLinkExternal: false,
  imageSrc: "zeeguu-mockup.png",
};

const mockRepo: ProjectRepository = {
  getAll: jest.fn(),
  getBySlug: jest.fn((slug: string) =>
    Promise.resolve(slug === "zeeguu" ? mockProject : null)
  ),
};

describe("getProjectBySlug", () => {
  it("returns the project when the slug matches", async () => {
    const result = await getProjectBySlug(mockRepo, "zeeguu");
    expect(result).toEqual(mockProject);
  });

  it("returns null when no project matches the slug", async () => {
    const result = await getProjectBySlug(mockRepo, "unknown");
    expect(result).toBeNull();
  });

  it("returns null for an empty slug", async () => {
    const result = await getProjectBySlug(mockRepo, "");
    expect(result).toBeNull();
  });
});
