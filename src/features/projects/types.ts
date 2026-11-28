type ProjectBase = {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly imageSrc: string;
};

/** Internal projects have a case-study page at /:slug; external ones link out. */
export type Project =
  | (ProjectBase & { readonly kind: "internal"; readonly slug: string })
  | (ProjectBase & { readonly kind: "external"; readonly url: string });

export type ProjectContentItem = {
  readonly id: number;
  readonly imgSrc: string;
  readonly alt: string;
  readonly description: string;
}

export type ProjectSide = {
  readonly title: string;
  readonly content: readonly ProjectContentItem[];
}

export type ProjectSection = {
  readonly id: number;
  readonly title: string;
  readonly before: ProjectSide;
  readonly after: ProjectSide;
}

export type ProjectDetail = {
  readonly slug: string;
  readonly sections: readonly ProjectSection[];
}
