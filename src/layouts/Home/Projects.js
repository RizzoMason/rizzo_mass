import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import RouterLink from 'next/link';
import { useState } from 'react';
import { projects } from './projectData';
import styles from './Projects.module.css';

const galleryProjects = projects.filter(project => project.image);

function isExternalLink(href) {
  return href?.includes('://');
}

function ProjectTile({ project, index, visible }) {
  const href = `/projects/${project.slug}`;
  const content = (
    <>
      <span className={styles.tileMedia} aria-hidden>
        <img src={project.image} alt="" loading="lazy" decoding="async" />
      </span>
      <span className={styles.tileScrim} aria-hidden />
      <span className={styles.tileMeta}>
        <span className={styles.tileIndex}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.tileTitle}>{project.title}</span>
        <span className={styles.tileTagline}>{project.tagline}</span>
      </span>
      <span className={styles.tileArrow} aria-hidden>
        →
      </span>
    </>
  );

  if (isExternalLink(href)) {
    return (
      <a
        className={styles.tile}
        href={href}
        data-visible={visible}
        style={{ '--delay': `${index * 70 + 280}ms` }}
        data-span={
          index === galleryProjects.length - 1
            ? 'full'
            : index % 5 === 0 || index % 5 === 3
              ? 'wide'
              : 'normal'
        }
      >
        {content}
      </a>
    );
  }

  return (
    <RouterLink href={href} passHref scroll={false}>
      <a
        className={styles.tile}
        data-visible={visible}
        style={{ '--delay': `${index * 70 + 280}ms` }}
        data-span={
          index === galleryProjects.length - 1
            ? 'full'
            : index % 5 === 0 || index % 5 === 3
              ? 'wide'
              : 'normal'
        }
      >
        {content}
      </a>
    </RouterLink>
  );
}

export const Projects = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.projects}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.index} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <span className={styles.indexNumber} data-visible={visible}>
                  04
                </span>
              </div>
              <Heading
                className={styles.title}
                data-visible={visible}
                level={3}
                id={titleId}
              >
                <DecoderText text="Selected work" start={visible} delay={500} />
              </Heading>
              <Text className={styles.description} data-visible={visible} size="l" as="p">
                A few more products shipped with BuildFast.
              </Text>
            </div>

            <div className={styles.grid}>
              {galleryProjects.map((project, index) => (
                <ProjectTile
                  key={project.slug}
                  project={project}
                  index={index}
                  visible={visible}
                />
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
