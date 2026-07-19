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

/** Pack tiles into full 12-col rows: 8+4, 4+4+4, 4+8. Remainder becomes half/half or full. */
function getGallerySpans(count) {
  const spans = [];
  let i = 0;
  let rowType = 0;

  while (i < count) {
    const remaining = count - i;

    if (remaining === 1) {
      spans.push('full');
      break;
    }

    if (remaining === 2) {
      spans.push('half', 'half');
      break;
    }

    if (rowType === 0) {
      spans.push('wide', 'normal');
      i += 2;
    } else if (rowType === 1) {
      if (remaining >= 3) {
        spans.push('normal', 'normal', 'normal');
        i += 3;
      } else {
        spans.push('half', 'half');
        i += 2;
      }
    } else {
      spans.push('normal', 'wide');
      i += 2;
    }

    rowType = (rowType + 1) % 3;
  }

  return spans;
}

const gallerySpans = getGallerySpans(galleryProjects.length);

function isExternalLink(href) {
  return href?.includes('://');
}

function ProjectTile({ project, index, visible, span }) {
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

  const sharedProps = {
    className: styles.tile,
    'data-visible': visible,
    'data-span': span,
    style: { '--delay': `${index * 70 + 280}ms` },
  };

  if (isExternalLink(href)) {
    return (
      <a {...sharedProps} href={href}>
        {content}
      </a>
    );
  }

  return (
    <RouterLink href={href} passHref scroll={false}>
      <a {...sharedProps}>{content}</a>
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
                  span={gallerySpans[index]}
                />
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
