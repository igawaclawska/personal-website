import type { ProjectSection } from "../types";
import zeeguuSections from "./zeeguuProject.json";

export const projectDetails: Record<string, readonly ProjectSection[]> = {
  zeeguu: zeeguuSections as ProjectSection[],
};
