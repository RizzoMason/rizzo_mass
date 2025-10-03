import gamestackTexture2Large from 'assets/plethora.png';
import gamestackTexture2Placeholder from 'assets/plethora.png';

import gamestackTexture2 from 'assets/plethora.png';
import gamestackTextureLarge from 'assets/plethora.png';

import gamestackTexturePlaceholder from 'assets/placeholder.png';
import gamestackTexture from 'assets/placeholder.png';

import sliceTextureLarge from 'assets/buildfast.png';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/buildfast.png';
import sprTextureLarge from 'assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/astra.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import { Helmet } from 'react-helmet';
import { Contact } from 'pages/contact/Contact';

const disciplines = ['Entrepreneur', 'Producer', 'Artist'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Helmet>
        <script defer src="https://badr.lol/" data-hash></script>
      </Helmet>
      <Meta
        title="Developer + Producer"
        description="Welcome to Rami Badr's Portfolio."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={1} // Updated index
        title="BuildFast"
        description="Turn your idea into a market-ready product in weeks."
        buttonText="View website"
        buttonLink="https://buildfast.us/"
        model={{
          type: 'laptop',
          alt: 'A screenshot of the current UI',
          textures: [
            {
              srcSet: [sliceTexture, sliceTextureLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={2} // Updated index
        title="Astra Voice"
        description="Building the future of customer support & it speaks your language."
        buttonText="Learn More"
        buttonLink="/projects/astra-voice"
        secondaryButtonText="View Article"
        secondaryButtonLink="https://www.digitaljournal.com/pr/news/vehement-media/astra-voice-future-customer-support-1269680948.html"
        model={{
          type: 'laptop',
          alt: 'Screenshot of the current UI',
          textures: [
            {
              srcSet: [sprTexture, sprTextureLarge],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={3} // Updated index
        title="Plethora"
        description="Turn audio & videos into notes,\nflashcards, quizzes, conversations and more."
        buttonText="Learn More"
        buttonLink="/projects/plethora"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <section id="details" className={styles.detailsAnchor} />
      <div className={styles.profileOverlapWrapper}>
        <Profile
          sectionRef={details}
          visible={visibleSections.includes(details.current)}
        />
      </div>
      <Contact />

      <Footer />
    </div>
  );
};
