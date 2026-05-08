import type { Project } from "../types";
import type { ProjectRepository } from "./types";
import projectsData from "../data/projects.json";

const projects: readonly Project[] = projectsData as Project[];

export const jsonProjectRepository: ProjectRepository = {
  async getAll() {
    return projects;
  },

  async getBySlug(slug) {
    return projects.find((p) => p.slug === slug) ?? null;
  },
};
