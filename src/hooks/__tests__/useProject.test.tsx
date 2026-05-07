import { renderHook, waitFor } from "@testing-library/react";
import { useProject } from "../useProject";
import type { Project } from "../../domain/project";

const mockProject: Project = {
  id: 2,
  slug: "zeeguu",
  title: "ITU - Zeeguu",
  description: "A language learning platform",
  technologies: ["React"],
  link: "/zeeguu",
  isLinkExternal: false,
  imageSrc: "zeeguu-mockup.png",
};

jest.mock("../../infrastructure/jsonProjectRepository", () => ({
  jsonProjectRepository: {
    getAll: jest.fn(),
    getBySlug: jest.fn((slug: string) =>
      Promise.resolve(slug === "zeeguu" ? mockProject : null)
    ),
  },
}));

describe("useProject", () => {
  it("starts in loading state", () => {
    const { result } = renderHook(() => useProject("zeeguu"));
    expect(result.current.status).toBe("loading");
  });

  it("transitions to success when the project is found", async () => {
    const { result } = renderHook(() => useProject("zeeguu"));
    await waitFor(() => expect(result.current.status).toBe("success"));
    if (result.current.status === "success") {
      expect(result.current.data.title).toBe("ITU - Zeeguu");
    }
  });

  it("transitions to not-found for an unknown slug", async () => {
    const { result } = renderHook(() => useProject("unknown-slug"));
    await waitFor(() => expect(result.current.status).toBe("not-found"));
  });

  it("transitions to not-found for an empty slug", async () => {
    const { result } = renderHook(() => useProject(""));
    await waitFor(() => expect(result.current.status).toBe("not-found"));
  });
});
