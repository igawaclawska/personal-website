import { useState, useEffect } from "react";
import type { Project } from "../domain/project";
import { getProjectBySlug } from "../application/getProjectBySlug";
import { jsonProjectRepository } from "../infrastructure/jsonProjectRepository";

type UseProjectResult =
  | { status: "loading" }
  | { status: "success"; data: Project }
  | { status: "not-found" }
  | { status: "error"; error: Error };

export function useProject(slug: string): UseProjectResult {
  const [result, setResult] = useState<UseProjectResult>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    getProjectBySlug(jsonProjectRepository, slug)
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
