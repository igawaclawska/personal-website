import { getProjectPage } from "../getProjectPage";
import type { ProjectRepository } from "../../repositories/types";
import type { Project, ProjectDetail } from "../../types";

const zeeguu: Project = {
  id: 2,
  kind: "internal",
  slug: "zeeguu",
  title: "ITU - Zeeguu",
  description: "A language learning platform",
  technologies: ["React", "JavaScript"],
  imageSrc: "zeeguu-mockup.png",
};

const noDetail: Project = { ...zeeguu, id: 3, slug: "no-detail" };

const zeeguuDetail: ProjectDetail = { slug: "zeeguu", sections: [] };

const projects = [zeeguu, noDetail];

const mockRepo: ProjectRepository = {
  getAll: jest.fn(),
  getBySlug: jest.fn((slug: string) =>
    Promise.resolve(projects.find((p) => p.slug === slug) ?? null)
  ),
  getDetailBySlug: jest.fn((slug: string) =>
    Promise.resolve(slug === "zeeguu" ? zeeguuDetail : null)
  ),
};

describe("getProjectPage", () => {
  it("returns the project together with its detail", async () => {
    const result = await getProjectPage(mockRepo, "zeeguu");
    expect(result).toEqual({ project: zeeguu, detail: zeeguuDetail });
  });

  it("returns null when no project matches the slug", async () => {
    const result = await getProjectPage(mockRepo, "unknown");
    expect(result).toBeNull();
  });

  it("returns null when the project exists but has no detail", async () => {
    const result = await getProjectPage(mockRepo, "no-detail");
    expect(result).toBeNull();
  });

  it("returns null for an empty slug", async () => {
    const result = await getProjectPage(mockRepo, "");
    expect(result).toBeNull();
  });
});
