import type { ProjectDetail } from "../domain/project";
import type { ProjectDetailRepository } from "../domain/repositories";
import { projectDetails } from "../data/projectDetails";

export const jsonProjectDetailRepository: ProjectDetailRepository = {
  async getBySlug(slug) {
    const sections = projectDetails[slug];
    if (!sections) return null;
    return { slug, sections };
  },
};
