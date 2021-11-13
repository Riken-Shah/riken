import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { TweenMax } from "gsap";
import SlidingHeading from "./SlidingHeading";
import { Context } from "../store";
import theme from "../theme";
import { device } from "../utils";
import { APP_STATE } from "../reducer";

const data = [
  {
    name: "Hand Detection",
    tagline: "Deep Learning Model",
    href: "https://www.github.com",
  },
  {
    name: "Insta Page Manager",
    tagline: "Automation Bot",
    href: "https://www.github.com",
  },
];

const ProjectSectionWrapper = styled.div`
  padding-top: 5vh;
  position: relative;
  overflow: hidden;
  margin-bottom: 5vh;
  width: 100vw;
`;

const ProjectWrapper = styled.div`
  font-family: "Druk Wide Bold";
  width: 100vw;
  padding: 10vh 50px;
  flex-direction: column;
  position: relative;
  z-index: 3;

  @media only screen and ${device.tablet} {
    padding: 10vh 20px;
  }
`;

const Project = styled.div`
  display: flex;
  margin: 70px 0 0;
  width: 100%;
  height: 150px;
  cursor: pointer;

  &:hover {
    .title {
      color: ${theme.background};
      text-shadow: ${`-1px -1px 0 ${theme.primary}, 1px -1px 0 ${theme.primary}, -1px 1px 0 ${theme.primary}, 1px 1px 0 ${theme.primary}`};
    }
  }

  @media only screen and ${device.tablet} {
    margin: 40px 0 0;
    height: auto;
  }
`;
const ProjectNumber = styled.div`
  width: 65px;
  padding-top: 12px;

  @media only screen and ${device.mobileL} {
    padding-top: 4px;
    font-size: 4vw;
  }
`;

const ProjectTitleWrapper = styled.div`
  flex: 1;
  letter-spacing: 1px;
`;

const Title = styled.span`
  font-size: 50px;
  transition: all 0.4s ease-out;

  @media only screen and ${device.tablet} {
    font-size: 25px;
  }

  @media only screen and ${device.mobileL} {
    font-size: 6vw;
  }
`;

const Tagline = styled.span`
  font-family: Montserrat;
  font-weight: 400;
  font-size: 17px;
  color: #a7a7a7;
  padding-top: 5px;
  display: block;

  @media only screen and ${device.mobileL} {
    font-size: 4vw;
  }
`;

const Image3DContainer = styled.div`
  position: absolute;
  top: 0;
  right: -30vw;
  transition: top 1s ease-in-out;
  z-index: 1;
`;

function Projects() {
  const [tween, setTween] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [top, setTop] = useState(0);
  const [state] = useContext(Context);
  const onRefChange = useCallback((node) => {
    if (node) {
      // eslint-disable-next-line global-require
      const ImageSlider = require("./3D/index").default;
      const t = ImageSlider(node);
      setTween(t);
      t?.reverse();
    } else setTween(null);
  }, []);

  function convertNumber(num) {
    return num < 10 ? `0${num}` : num;
  }

  return (
    <ProjectSectionWrapper>
      <SlidingHeading word="PROJECTS" />
      <ProjectWrapper>
        {data.map((project, idx) => (
          <Project
            onClick={() => window.open(project.href)}
            key={project.name}
            onMouseOver={(e) => {
              setTop(e.target.offsetTop - state.windowSize.height * 0.35);
              if (idx !== activeImageIdx) {
                if (idx === 0) {
                  tween?.reverse();
                } else {
                  TweenMax.to(tween, 0, { timeScale: 1 });
                }
                setActiveImageIdx(idx);
              }
            }}
          >
            <ProjectNumber>{convertNumber(idx + 1)}</ProjectNumber>
            <ProjectTitleWrapper>
              <Title className="title">{project.name}</Title>
              <br />
              <Tagline>{project.tagline}</Tagline>
            </ProjectTitleWrapper>
          </Project>
        ))}
      </ProjectWrapper>
      {state?.appState === APP_STATE.DESKTOP && (
        <Image3DContainer className="three" ref={onRefChange} style={{ top }} />
      )}
    </ProjectSectionWrapper>
  );
}

export default Projects;
