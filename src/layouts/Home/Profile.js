import profileKatakana from 'assets/katakana-profile.svg?url';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const profileImg = { src: '/static/rami.png' };

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Who ?" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I&apos;m Rami. I run <Link href="https://buildfast.us/">BuildFast</Link>, where I build
      MVPs and web apps for non-technical founders to get to market.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I&apos;ve shipped products across fitness, social, and AI tooling, including{' '}
      <Link href="/projects/astra-voice">Astra Voice</Link>, AutoCall, and Wavelens. I work
      directly with founders from scoping to shipping, in weeks not months.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      If you have an idea and need someone who can actually build it, let&apos;s talk.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <div className={styles.actions} data-visible={visible}>
                <Button
                  secondary
                  iconHoverShift
                  href="https://www.linkedin.com/in/ramibadr/"
                  icon="linkedin"
                >
                  View LinkedIn
                </Button>
                <Button
                  secondary
                  iconHoverShift
                  href="https://github.com/bxdr-glitch"
                  icon="github"
                >
                  View GitHub
                </Button>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImg}
                  srcSet={[profileImg, profileImg]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Rami Badr"
                />
                <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                  <use href={`${profileKatakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
