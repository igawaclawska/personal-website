import type { Project } from "../domain/project";
import type { ProjectRepository } from "../domain/repositories";

export async function getProjects(
  repo: ProjectRepository
): Promise<readonly Project[]> {
  return repo.getAll();
}
