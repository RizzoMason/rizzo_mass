import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import usesBackground from 'assets/uses-background.mp4';
import { Footer } from 'components/Footer';
import { Link } from 'components/Link';
import { List, ListItem } from 'components/List';
import { Meta } from 'components/Meta';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from 'components/Table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment } from 'react';
import styles from './Uses.module.css';

export const Uses = () => {
  return (
    <Fragment>
      <Meta
        title="Uses"
        description="A list of hardware and software I use to do my thing"
      />
      <ProjectContainer className={styles.uses}>
        <ProjectBackground
          src={{ src: usesBackground }}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title="Uses"
          description="A somewhat comprehensive list of tools, apps, hardware, and more that I use on a daily basis to design and code things. And yeah, that is a Johnny Mnemonic GIF in the background."
        />
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Design</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    Any motion graphics I create are created in Adobe After Effects. So
                    far I haven’t found a non-Adobe product that’s as good. If anyone has
                    suggestions please <Link href="/contact">message me</Link>.
                  </ListItem>
                  <ListItem>
                    For any 3D models I use{' '}
                    <Link href="https://www.blender.org/">Blender</Link>. Since 2.8 it’s
                    become way simpler to use and in a lot of ways better than expensive
                    paid tools like 3DS Max or Maya.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    I use{' '}
                    <Link href="https://code.visualstudio.com/">Visual Studio Code</Link>{' '}
                    as my text editor, with the Atom One Dark theme and Operator Mono as
                    my typeface of choice.
                  </ListItem>
                  <ListItem>
                    Microsoft Edge is my main browser for both development and general use. (and ARC on my laptop)
                  </ListItem>
                  <ListItem>
                    <Link href="https://reactjs.org/">React</Link> is my front end
                    Javascript library of choice. The component-centric mental model is
                    the first thing that truly made sense to me as a designer.
                  </ListItem>
                  <ListItem>
                    For 3D effects and image shaders I use{' '}
                    <Link href="https://threejs.org/">three.js</Link>. It has a bit of a
                    learning curve but you can do some really powerful stuff with it.
                  </ListItem>
                  <ListItem>
                    For CSS I’ve used a myriad pre-processors and css-in-js solutions like
                    styled-components, but these days I’m using vanilla CSS with{' '}
                    <Link href="https://postcss.org/">PostCSS</Link> to get upcoming CSS
                    features today.
                  </ListItem>
                  <ListItem>
                    For Javascript animations I use{' '}
                    <Link href="https://www.framer.com/motion/">Framer Motion</Link>, it’s
                    a great way to add spring animations to React and three.js.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>Hardware</ProjectSectionHeading>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeadCell>CPU</TableHeadCell>
                    <TableCell>AMD Ryzen 3600x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>GPU</TableHeadCell>
                    <TableCell>Gigabyte RTX 2060 v2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Memory</TableHeadCell>
                    <TableCell>Corsair Vegance 4x8 32gb</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Motherboard</TableHeadCell>
                    <TableCell>MSI B450 Gaming Plus Max</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Monitors</TableHeadCell>
                    <TableCell>AOC 1080p 165hz 21incj/ Samsung 75hz 17inch </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Keyboard</TableHeadCell>
                    <TableCell>Newskill Serike TKL</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Mouse</TableHeadCell>
                    <TableCell>Logitech G203</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableRow>
                      <TableHeadCell>Headphones</TableHeadCell>
                      <TableCell>Razer Kraken Tournament Edition</TableCell>
                    </TableRow>
                  </TableRow>
                </TableBody>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
