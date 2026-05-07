export type Project ={
  readonly id: number;
  readonly slug?: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly link: string;
  readonly isLinkExternal: boolean;
  readonly imageSrc: string;
}

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
