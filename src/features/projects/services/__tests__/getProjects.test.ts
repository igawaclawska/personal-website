import { getProjects } from "../getProjects";
import type { ProjectRepository } from "../../repositories/types";
import type { Project } from "../../types";

const mockProject: Project = {
  id: 1,
  slug: "test-project",
  title: "Test Project",
  description: "A test project",
  technologies: ["React", "TypeScript"],
  link: "/test-project",
  isLinkExternal: false,
  imageSrc: "test.png",
};

const mockRepo: ProjectRepository = {
  getAll: jest.fn().mockResolvedValue([mockProject]),
  getBySlug: jest.fn(),
  getDetailBySlug: jest.fn(),
};

describe("getProjects", () => {
  it("returns all projects from the repository", async () => {
    const result = await getProjects(mockRepo);
    expect(result).toEqual([mockProject]);
  });

  it("returns an empty array when there are no projects", async () => {
    const emptyRepo: ProjectRepository = {
      getAll: jest.fn().mockResolvedValue([]),
      getBySlug: jest.fn(),
      getDetailBySlug: jest.fn(),
    };
    const result = await getProjects(emptyRepo);
    expect(result).toHaveLength(0);
  });
});
