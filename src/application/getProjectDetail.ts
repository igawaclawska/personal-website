import type { ProjectDetail } from "../domain/project";
import type { ProjectDetailRepository } from "../domain/repositories";

export async function getProjectDetail(
  repo: ProjectDetailRepository,
  slug: string
): Promise<ProjectDetail | null> {
  if (!slug || typeof slug !== "string") return null;
  return repo.getBySlug(slug);
}
