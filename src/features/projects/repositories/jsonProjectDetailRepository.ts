import type { ProjectDetailRepository } from "./types";
import { projectDetails } from "../data/projectDetails";

export const jsonProjectDetailRepository: ProjectDetailRepository = {
  async getDetailBySlug(slug) {
    const sections = projectDetails[slug];
    if (!sections) return null;
    return { slug, sections };
  },
};
