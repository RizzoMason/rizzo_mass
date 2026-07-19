import backgroundSprLarge from 'assets/bg.png';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';
import backgroundSpr from 'assets/bg.png';
import placeholderImage from 'assets/placeholder.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { useTheme } from 'components/ThemeProvider';
import { getProjectBySlug, projects } from 'layouts/Home/projectData';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
} from 'layouts/Project';
import { Fragment } from 'react';
import { media } from 'utils/style';

export function getStaticPaths() {
  return {
    paths: projects.map(project => ({
      params: { slug: project.slug },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
}

export default function ProjectPage({ project }) {
  const { themeId } = useTheme();
  const isDark = themeId === 'dark';
  const projectImage = project.image ? { src: project.image } : placeholderImage;

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Meta title={project.title} prefix="Projects" description={project.description} />
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundSpr}
          srcSet={`${backgroundSpr.src} 1080w, ${backgroundSprLarge.src} 2160w`}
          placeholder={backgroundSprPlaceholder}
        />
        <ProjectHeader
          title={project.title}
          description={project.description}
          url={project.url}
          roles={project.roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={`${themeId}-${project.slug}`}
              srcSet={[projectImage, projectImage]}
              placeholder={projectImage}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt={`${project.title} product screenshot`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
