import styles from "./ProjectCard.module.css";
import { Link, type To } from "react-router-dom";
import Heading from "../../../shared/components/Heading";

type Props = {
  title: string;
  description: string;
  technologies: readonly string[];
  imageSrc: string;
  to: To;
  isExternal?: boolean;
};

const ProjectCard = ({
  title,
  description,
  technologies,
  imageSrc,
  to,
  isExternal = false,
}: Props) => {
  return (
    <article className={styles.background}>
      <div className={styles.projectDescriptionContainer}>
        <Heading alignment="left" level={3}>
          {title}
        </Heading>
        <p>{description}</p>
        {technologies.length > 0 && (
          <div className={styles.technologies}>
            {technologies.map((tech) => (
              <span key={tech} className={styles.technology}>
                {tech}
              </span>
            ))}
          </div>
        )}
        {isExternal ? (
          <a
            className={styles.goToLink}
            href={to as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about this project
          </a>
        ) : (
          <Link className={styles.goToLink} to={to}>
            Learn more about this project
          </Link>
        )}
      </div>
      <div className={styles.imageContainer}>
        <img alt="" src={imageSrc} className={styles.projectImage} />
      </div>
    </article>
  );
};

export default ProjectCard;
