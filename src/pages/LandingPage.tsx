import { useRef } from "react";
import { useProjects } from "../features/projects/hooks/useProjects";
import { getAssetUrl } from "../utils/getAssetUrl";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Section from "../components/Section";
import Heading from "../components/Heading";
import ProjectCard from "../features/projects/components/ProjectCard";
import Button from "../components/Button";
import Footer from "../components/Footer";
import styles from "./LandingPage.module.css";
import profilePhoto from "../assets/profile-photo-mini.png";

const LandingPage = () => {
  const projectsResult = useProjects();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToSection = () => {
    if (sectionRef.current) {
      const elementPosition =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - 120,
        behavior: "smooth",
      });

      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.focus();
        }
      }, 500);
    }
  };

  return (
    <>
      <title>Iga Waclawska - Software Developer</title>
      <Header>
        <Navbar />
      </Header>
      <Main>
        <Section>
          <div className={styles.grid}>
            <div>
              <div>
                <h1>I develop user-first digital experiences</h1>
              </div>
              <p className={styles.subheadline}>
                I'm a Copenhagen-based
                <span className={styles.highlightedText}>
                  &#32;software developer&#32;
                </span>
                with a&nbsp;background in&nbsp;UX/UI design. I'm dedicated to
                building accessible, intuitive, and high-performing digital
                solutions. I work across web and mobile platforms using modern
                tech stacks such as JavaScript, TypeScript, React, React Native,
                and more.
              </p>

              <div>
                <Button onClick={handleScrollToSection}>See Projects</Button>
              </div>
            </div>
            <img className={styles.profileImg} alt="" src={profilePhoto} />
          </div>
        </Section>
        <Section>
          <Heading level={2} isUnderlined={true} ref={sectionRef} tabIndex={-1}>
            Selected Work
          </Heading>
          {projectsResult.status === "loading" && <p>Loading projects…</p>}
          {projectsResult.status === "error" && <p>Could not load projects.</p>}
          {projectsResult.status === "success" &&
            projectsResult.data.map((project) => (
              <ProjectCard
                key={project.id}
                to={project.link}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                imageSrc={getAssetUrl(project.imageSrc)}
                isExternal={project.isLinkExternal}
              />
            ))}
        </Section>
      </Main>
      <Footer />
    </>
  );
};

export default LandingPage;
