import type { Project } from "../types";
import { useAsync } from "../../../hooks/useAsync";
import { getProjects } from "../services/getProjects";
import { jsonProjectRepository } from "../repositories/jsonProjectRepository";

export type UseProjectsResult =
  | { status: "loading" }
  | { status: "success"; data: readonly Project[] }
  | { status: "error"; error: Error };

export function useProjects(): UseProjectsResult {
  return useAsync(() => getProjects(jsonProjectRepository), []);
}
