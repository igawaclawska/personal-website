import type { Project } from "../types";
import { useAsync } from "../../../shared/hooks/useAsync";
import { getProjects } from "../services/getProjects";
import { projectRepository } from "../repositories";

export type UseProjectsResult =
  | { status: "loading" }
  | { status: "success"; data: readonly Project[] }
  | { status: "error"; error: Error };

export function useProjects(): UseProjectsResult {
  return useAsync(() => getProjects(projectRepository), []);
}
