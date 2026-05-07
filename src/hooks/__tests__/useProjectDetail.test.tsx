import { renderHook, waitFor } from "@testing-library/react";
import { useProjectDetail } from "../useProjectDetail";
import type { ProjectDetail } from "../../domain/project";

const mockDetail: ProjectDetail = {
  slug: "zeeguu",
  sections: [],
};

jest.mock("../../infrastructure/jsonProjectDetailRepository", () => ({
  jsonProjectDetailRepository: {
    getBySlug: jest.fn((slug: string) =>
      Promise.resolve(slug === "zeeguu" ? mockDetail : null)
    ),
  },
}));

describe("useProjectDetail", () => {
  it("starts in loading state", () => {
    const { result } = renderHook(() => useProjectDetail("zeeguu"));
    expect(result.current.status).toBe("loading");
  });

  it("transitions to success when detail is found", async () => {
    const { result } = renderHook(() => useProjectDetail("zeeguu"));
    await waitFor(() => expect(result.current.status).toBe("success"));
    if (result.current.status === "success") {
      expect(result.current.data.slug).toBe("zeeguu");
    }
  });

  it("transitions to not-found for an unknown slug", async () => {
    const { result } = renderHook(() => useProjectDetail("unknown-slug"));
    await waitFor(() => expect(result.current.status).toBe("not-found"));
  });

  it("transitions to not-found for an empty slug", async () => {
    const { result } = renderHook(() => useProjectDetail(""));
    await waitFor(() => expect(result.current.status).toBe("not-found"));
  });
});
