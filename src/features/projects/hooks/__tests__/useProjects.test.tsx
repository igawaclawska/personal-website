import { renderHook, waitFor } from "@testing-library/react";
import { useProjects } from "../useProjects";
import type { Project } from "../../types";

const mockProject: Project = {
  id: 1,
  slug: "test-project",
  title: "Test Project",
  description: "A test project",
  technologies: ["React"],
  link: "/test-project",
  isLinkExternal: false,
  imageSrc: "test.png",
};

const mockGetAll = jest.fn().mockResolvedValue([mockProject]);

jest.mock("../../repositories/jsonProjectRepository", () => ({
  jsonProjectRepository: {
    getAll: (...args: unknown[]) => mockGetAll(...args),
    getBySlug: jest.fn(),
  },
}));

describe("useProjects", () => {
  beforeEach(() => {
    mockGetAll.mockResolvedValue([mockProject]);
  });

  it("starts in loading state", () => {
    const { result } = renderHook(() => useProjects());
    expect(result.current.status).toBe("loading");
  });

  it("transitions to success with the project data", async () => {
    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.status).toBe("success"));
    if (result.current.status === "success") {
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data[0].title).toBe("Test Project");
    }
  });

  it("transitions to error when the repository rejects", async () => {
    mockGetAll.mockRejectedValueOnce(new Error("fetch failed"));
    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.status).toBe("error"));
    if (result.current.status === "error") {
      expect(result.current.error.message).toBe("fetch failed");
    }
  });
});
