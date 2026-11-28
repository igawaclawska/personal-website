import type { Project } from "../types";
import type { ProjectRepository } from "./types";
import projectsData from "../data/projects.json";
import { projectDetails } from "../data/projectDetails";

const projects: readonly Project[] = projectsData as Project[];

export const jsonProjectRepository: ProjectRepository = {
  async getAll() {
    return projects;
  },

  async getBySlug(slug) {
    return projects.find((p) => p.slug === slug) ?? null;
  },

  async getDetailBySlug(slug) {
    const sections = projectDetails[slug];
    if (!sections) return null;
    return { slug, sections };
  },
};
