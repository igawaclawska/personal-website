import type { ProjectDetail } from "../types";
import type { ProjectDetailRepository } from "../repositories/types";

export async function getProjectDetail(
  repo: ProjectDetailRepository,
  slug: string
): Promise<ProjectDetail | null> {
  if (!slug || typeof slug !== "string") return null;
  return repo.getDetailBySlug(slug);
}
