import type { ProjectRepository } from "./types";
import { projects } from "../data/projects";
import { projectDetails } from "../data/projectDetails";

/** Reads the project data bundled with the site at build time. */
export const staticProjectRepository: ProjectRepository = {
  async getAll() {
    return projects;
  },

  async getBySlug(slug) {
    return (
      projects.find((p) => p.kind === "internal" && p.slug === slug) ?? null
    );
  },

  async getDetailBySlug(slug) {
    const sections = projectDetails[slug];
    if (!sections) return null;
    return { slug, sections };
  },
};
