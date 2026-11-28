import type { Project } from "../types";
import { useAsync } from "../../../shared/hooks/useAsync";
import { getProjectBySlug } from "../services/getProjectBySlug";
import { jsonProjectRepository } from "../repositories/jsonProjectRepository";

export type UseProjectResult =
  | { status: "loading" }
  | { status: "success"; data: Project }
  | { status: "not-found" }
  | { status: "error"; error: Error };

export function useProject(slug: string): UseProjectResult {
  const asyncResult = useAsync<Project | null>(
    () => getProjectBySlug(jsonProjectRepository, slug),
    [slug]
  );

  if (asyncResult.status === "success") {
    return asyncResult.data === null
      ? { status: "not-found" }
      : { status: "success", data: asyncResult.data };
  }

  return asyncResult;
}
