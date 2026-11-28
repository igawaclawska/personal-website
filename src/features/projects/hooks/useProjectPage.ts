import { useAsync } from "../../../shared/hooks/useAsync";
import { getProjectPage, type ProjectPageData } from "../services/getProjectPage";
import { projectRepository } from "../repositories";

export type UseProjectPageResult =
  | { status: "loading" }
  | { status: "success"; data: ProjectPageData }
  | { status: "not-found" }
  | { status: "error"; error: Error };

export function useProjectPage(slug: string): UseProjectPageResult {
  const asyncResult = useAsync<ProjectPageData | null>(
    () => getProjectPage(projectRepository, slug),
    [slug]
  );

  if (asyncResult.status === "success") {
    return asyncResult.data === null
      ? { status: "not-found" }
      : { status: "success", data: asyncResult.data };
  }

  return asyncResult;
}
