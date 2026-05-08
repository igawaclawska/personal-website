import { useState, useEffect } from "react";

export type AsyncResult<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export function useAsync<T>(
  fetchFn: () => Promise<T>,
  deps: readonly unknown[]
): AsyncResult<T> {
  const [result, setResult] = useState<AsyncResult<T>>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetchFn()
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
    // deps is intentionally variable — callers control the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return result;
}
