import type { Project } from "../domain/project";
import type { ProjectRepository } from "../domain/repositories";

export async function getProjectBySlug(
  repo: ProjectRepository,
  slug: string
): Promise<Project | null> {
  if (!slug || typeof slug !== "string") return null;
  return repo.getBySlug(slug);
}
