import type { ProjectSection } from "../domain/project";
import zeeguuSections from "./zeeguuProject.json";

export const projectDetails: Record<string, readonly ProjectSection[]> = {
  zeeguu: zeeguuSections as ProjectSection[],
};
