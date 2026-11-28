import type { Project, ProjectDetail } from "../types";
import type { ProjectRepository } from "../repositories/types";

export type ProjectPageData = {
  readonly project: Project;
  readonly detail: ProjectDetail;
};

export async function getProjectPage(
  repo: ProjectRepository,
  slug: string
): Promise<ProjectPageData | null> {
  if (!slug || typeof slug !== "string") return null;
  const [project, detail] = await Promise.all([
    repo.getBySlug(slug),
    repo.getDetailBySlug(slug),
  ]);
  return project && detail ? { project, detail } : null;
}
