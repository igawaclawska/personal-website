import type { Project } from "../types";
import type { ProjectRepository } from "../repositories/types";

export async function getProjects(
  repo: ProjectRepository
): Promise<readonly Project[]> {
  return repo.getAll();
}
