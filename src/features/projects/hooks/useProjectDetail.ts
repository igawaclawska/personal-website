import type { ProjectDetail } from "../types";
import { useAsync } from "../../../shared/hooks/useAsync";
import { getProjectDetail } from "../services/getProjectDetail";
import { jsonProjectDetailRepository } from "../repositories/jsonProjectDetailRepository";

export type UseProjectDetailResult =
  | { status: "loading" }
  | { status: "success"; data: ProjectDetail }
  | { status: "not-found" }
  | { status: "error"; error: Error };

export function useProjectDetail(slug: string): UseProjectDetailResult {
  const asyncResult = useAsync<ProjectDetail | null>(
    () => getProjectDetail(jsonProjectDetailRepository, slug),
    [slug]
  );

  if (asyncResult.status === "success") {
    return asyncResult.data === null
      ? { status: "not-found" }
      : { status: "success", data: asyncResult.data };
  }

  return asyncResult;
}
