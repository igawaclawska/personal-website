import type { Project } from "../types";
import type { ProjectRepository } from "../repositories/types";

export async function getProjectBySlug(
  repo: ProjectRepository,
  slug: string
): Promise<Project | null> {
  if (!slug || typeof slug !== "string") return null;
  return repo.getBySlug(slug);
}
