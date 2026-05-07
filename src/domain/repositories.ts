import type { Project, ProjectDetail } from "./project";

export type ProjectRepository = {
  getAll(): Promise<readonly Project[]>;
  getBySlug(slug: string): Promise<Project | null>;
}

export type ProjectDetailRepository = {
  getBySlug(slug: string): Promise<ProjectDetail | null>;
}
