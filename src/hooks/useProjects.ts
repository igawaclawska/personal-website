import { useState, useEffect } from "react";
import type { Project } from "../domain/project";
import { getProjects } from "../application/getProjects";
import { jsonProjectRepository } from "../infrastructure/jsonProjectRepository";

type UseProjectsResult =
  | { status: "loading" }
  | { status: "success"; data: readonly Project[] }
  | { status: "error"; error: Error };

export function useProjects(): UseProjectsResult {
  const [result, setResult] = useState<UseProjectsResult>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    getProjects(jsonProjectRepository)
      .then((data) => {
        if (!cancelled) setResult({ status: "success", data });
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
  }, []);

  return result;
}
