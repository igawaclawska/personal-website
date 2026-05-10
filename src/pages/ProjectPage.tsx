import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../features/projects/hooks/useProject";
import { useProjectDetail } from "../features/projects/hooks/useProjectDetail";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Heading from "../components/Heading";
import Section from "../components/Section";
import Footer from "../components/Footer";
import styles from "./ProjectPage.module.css";
import Lightbox from "yet-another-react-lightbox";
import ZoomPlugin from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const ProjectPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const projectResult = useProject(slug);
  const detailResult = useProjectDetail(slug);

  const [openSrc, setOpenSrc] = useState<string | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (projectResult.status === "loading" || detailResult.status === "loading") {
    return null;
  }

  if (
    projectResult.status === "not-found" ||
    detailResult.status === "not-found" ||
    projectResult.status === "error" ||
    detailResult.status === "error"
  ) {
    return (
      <>
        <Header>
          <Navbar />
        </Header>
        <Main>
          <Section>
            <p>Project not found.</p>
          </Section>
        </Main>
        <Footer />
      </>
    );
  }

  const { data: project } = projectResult;
  const { data: detail } = detailResult;

  return (
    <>
      <title>{project.title}</title>
      <Header>
        <Navbar />
      </Header>
      <Main>
        <Section>
          <div className={styles.coverContainer}>
            <h1>{project.title}</h1>
            <p className={styles.subheadline}>{project.description}</p>
            {project.technologies.length > 0 && (
              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.technology}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Section>

        {detail.sections.map((section) => (
          <Section key={section.id}>
            <Heading alignment="center" level={2} isUnderlined={true}>
              {section.title}
            </Heading>
            <div className={styles.gridContainer}>
              <div className={styles.exampleContainer}>
                <Heading level={3}>{section.before.title}</Heading>
                <div className={styles.imagesColumn}>
                  {section.before.content.map((content) => (
                    <figure key={content.id}>
                      <img
                        className={styles.exampleImage}
                        src={content.imgSrc}
                        alt={content.alt}
                        onClick={() => setOpenSrc(content.imgSrc)}
                      />
                      <figcaption>{content.description}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
              <div className={styles.exampleContainer}>
                <Heading level={3}>{section.after.title}</Heading>
                <div className={styles.imagesColumn}>
                  {section.after.content.map((content) => (
                    <figure key={content.id}>
                      <img
                        className={styles.exampleImage}
                        src={content.imgSrc}
                        alt={content.alt}
                        onClick={() => setOpenSrc(content.imgSrc)}
                      />
                      <figcaption>{content.description}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        ))}
      </Main>
      <Footer />
      <Lightbox
        open={openSrc !== null}
        close={() => setOpenSrc(null)}
        slides={openSrc ? [{ src: openSrc }] : []}
        plugins={[ZoomPlugin]}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        animation={{ fade: 400 }}
      />
    </>
  );
};

export default ProjectPage;
