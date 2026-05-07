import { getProjectDetail } from "../getProjectDetail";
import type { ProjectDetailRepository } from "../../domain/repositories";
import type { ProjectDetail } from "../../domain/project";

const mockDetail: ProjectDetail = {
  slug: "zeeguu",
  sections: [],
};

const mockRepo: ProjectDetailRepository = {
  getBySlug: jest.fn((slug: string) =>
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
