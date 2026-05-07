import { useState, useEffect } from "react";
import type { ProjectDetail } from "../domain/project";
import { getProjectDetail } from "../application/getProjectDetail";
import { jsonProjectDetailRepository } from "../infrastructure/jsonProjectDetailRepository";

type UseProjectDetailResult =
  | { status: "loading" }
  | { status: "success"; data: ProjectDetail }
  | { status: "not-found" }
  | { status: "error"; error: Error };

export function useProjectDetail(slug: string): UseProjectDetailResult {
  const [result, setResult] = useState<UseProjectDetailResult>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    getProjectDetail(jsonProjectDetailRepository, slug)
      .then((data) => {
        if (cancelled) return;
        setResult(data === null ? { status: "not-found" } : { status: "success", data });
      })
      .catch((error: unknown) => {
        if (!cancelled)
          setResult({
            status: "error",
            error: error instanceof Error ? error : new Error(String(error)),
          });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return result;
}
