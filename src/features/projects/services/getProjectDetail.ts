import type { ProjectDetail } from "../types";
import type { ProjectRepository } from "../repositories/types";

export async function getProjectDetail(
  repo: ProjectRepository,
  slug: string
): Promise<ProjectDetail | null> {
  if (!slug || typeof slug !== "string") return null;
  return repo.getDetailBySlug(slug);
}
