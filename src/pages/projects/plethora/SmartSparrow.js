import backgroundSprLarge from 'assets/bg.png';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';

import backgroundSpr from 'assets/bg.png';
import imageSprLessonBuilderDarkLarge from 'assets/pleth.png';
import imageSprLessonBuilderDarkPlaceholder from 'assets/pleth.png';
import imageSprLessonBuilderDark from 'assets/pleth.png';

import imageSprLessonBuilderLightLarge from 'assets/spr-lesson-builder-light-large.jpg';
import imageSprLessonBuilderLightPlaceholder from 'assets/spr-lesson-builder-light-placeholder.jpg';
import imageSprLessonBuilderLight from 'assets/spr-lesson-builder-light.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { useTheme } from 'components/ThemeProvider';
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

const title = 'Plethora';
const description =
  'Turn audio & videos into notes, flashcards, quizzes, conversations and more.';
const roles = ['Record Lectures', 'Instant Notes', 'Chat with your notes'];

export const SmartSparrow = () => {
  const { themeId } = useTheme();

  const isDark = themeId === 'dark';

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Meta title={title} prefix="Projects" description={description} />
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundSpr}
          srcSet={`${backgroundSpr.src} 1080w, ${backgroundSprLarge.src} 2160w`}
          placeholder={backgroundSprPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://plethora.buildfast.us"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={themeId}
              srcSet={
                isDark
                  ? [imageSprLessonBuilderDark, imageSprLessonBuilderDarkLarge]
                  : [imageSprLessonBuilderLight, imageSprLessonBuilderLightLarge]
              }
              placeholder={
                isDark
                  ? imageSprLessonBuilderDarkPlaceholder
                  : imageSprLessonBuilderLightPlaceholder
              }
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="A screenshot of the current ui of the app"
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
