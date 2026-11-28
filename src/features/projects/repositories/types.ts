import type { Project, ProjectDetail } from "../types";

export type ProjectRepository = {
  getAll(): Promise<readonly Project[]>;
  getBySlug(slug: string): Promise<Project | null>;
  getDetailBySlug(slug: string): Promise<ProjectDetail | null>;
}
