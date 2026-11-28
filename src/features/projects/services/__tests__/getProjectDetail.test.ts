import { getProjectDetail } from "../getProjectDetail";
import type { ProjectRepository } from "../../repositories/types";
import type { ProjectDetail } from "../../types";

const mockDetail: ProjectDetail = {
  slug: "zeeguu",
  sections: [],
};

const mockRepo: ProjectRepository = {
  getAll: jest.fn(),
  getBySlug: jest.fn(),
  getDetailBySlug: jest.fn((slug: string) =>
    Promise.resolve(slug === "zeeguu" ? mockDetail : null)
  ),
};

describe("getProjectDetail", () => {
  it("returns the detail when the slug matches", async () => {
    const result = await getProjectDetail(mockRepo, "zeeguu");
    expect(result).toEqual(mockDetail);
  });

  it("returns null when no detail matches the slug", async () => {
    const result = await getProjectDetail(mockRepo, "unknown");
    expect(result).toBeNull();
  });

  it("returns null for an empty slug", async () => {
    const result = await getProjectDetail(mockRepo, "");
    expect(result).toBeNull();
  });
});
