import { renderHook, waitFor } from "@testing-library/react";
import { useProjectPage } from "../useProjectPage";
import type { Project, ProjectDetail } from "../../types";

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

const mockDetail: ProjectDetail = { slug: "zeeguu", sections: [] };

const mockGetBySlug = jest.fn((slug: string) =>
  Promise.resolve(slug === "zeeguu" ? mockProject : null)
);

jest.mock("../../repositories", () => ({
  projectRepository: {
    getAll: jest.fn(),
    getBySlug: (slug: string) => mockGetBySlug(slug),
    getDetailBySlug: jest.fn((slug: string) =>
      Promise.resolve(slug === "zeeguu" ? mockDetail : null)
    ),
  },
}));

describe("useProjectPage", () => {
  it("starts in loading state", () => {
    const { result } = renderHook(() => useProjectPage("zeeguu"));
    expect(result.current.status).toBe("loading");
  });

  it("transitions to success with the project and its detail", async () => {
    const { result } = renderHook(() => useProjectPage("zeeguu"));
    await waitFor(() => expect(result.current.status).toBe("success"));
    if (result.current.status === "success") {
      expect(result.current.data.project.title).toBe("ITU - Zeeguu");
      expect(result.current.data.detail.slug).toBe("zeeguu");
    }
  });

  it("transitions to not-found for an unknown slug", async () => {
    const { result } = renderHook(() => useProjectPage("unknown-slug"));
    await waitFor(() => expect(result.current.status).toBe("not-found"));
  });

  it("transitions to not-found for an empty slug", async () => {
    const { result } = renderHook(() => useProjectPage(""));
    await waitFor(() => expect(result.current.status).toBe("not-found"));
  });

  it("transitions to error when the repository rejects", async () => {
    mockGetBySlug.mockRejectedValueOnce(new Error("fetch failed"));
    const { result } = renderHook(() => useProjectPage("zeeguu"));
    await waitFor(() => expect(result.current.status).toBe("error"));
  });
});
