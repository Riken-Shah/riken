import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import styled from "styled-components";
import theme from "../theme";
import ButtonElement from "./Button";
import SlidingHeading from "./SlidingHeading";
import { Context, sections } from "../store";
import { device, screenSize } from "../utils";
import { ADD_SECTION_ELEMENT, APP_STATE } from "../reducer";

const data = [
  {
    name: "Mela",
    tagline: "Group Shopping App",
    roles: [
      {
        title: "Software Engineer Intern",
        duration: { start: "Aug 2021", end: "Present" },
      },
    ],
    points: [
      "Build a selenium workflow to automate google merchant account creation and auto-product syncing.",
      "Developed a feature to enable live-device tracking which will run in the background on react native mobile app.",
    ],
    href: "https:/sdasd.com",
  },
  {
    name: "Zulip",
    tagline: "Powerful Open Source Chat Software",
    roles: [
      {
        title: "Google Summer of Code Student Developer",
        duration: { start: "May 2021", end: "Sep 2021" },
      },
    ],
    points: [
      "Implemented emoji support for user status feature with the help of Django and jQuery.",
      "Lowered failure rate of the puppeteer test suite by improving tests and solving various non-deterministic failures.",
    ],
  },
  {
    name: "IEM Blog",
    tagline: "Blogs App To Inspire",
    roles: [
      {
        title: "Student Developer",
        duration: { start: "Dec 2020", end: "Jan 2021" },
      },
    ],
    points: [
      "Built notification feature for a blog app from scratch using Django and jQuery.",
      "Awarded one of the top contributors of the program out of 300+ participants.",
    ],
  },
  {
    name: "CureHat",
    tagline: "Telehealth Startup",
    roles: [
      {
        title: "Frontend Developer Intern",
        duration: { start: "Mar 2020", end: "May 2020" },
      },
    ],
    points: [
      "Worked closely with the founder and a team of 2 to develop the frontend of the web app using React, Redux, and Saga.",
      "Awarded one of the top contributors of the program out of 300+ participants.",
    ],
  },
];

const OuterWrapper = styled.div`
  width: 100vw;
  // Added this exponential space to make the scrolling smother
  height: ${data.length * 100 + data.length * 100 * 1 ** data.length * 0.5}vh;
  overflow: hidden;
  position: relative;

  @media only screen and ${device.tablet} {
    height: auto;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  jusitfy-content: center;

  @media only screen and ${device.tablet} {
    position: static;
    flex-direction: column;
    transform: translateX(0) !important;
  }
`;

const ExperienceContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 40px 0;
  transition: opacity 0.1s ease;
  @media only screen and ${device.tablet} {
    padding: 0 20px;
    margin: 5vh 0;
    height: auto;
    display: block;

    &:first-of-type {
      margin-top: 10vh;
    }
  }

  @media only screen and ${device.tabletSHeight} {
    // margin: 60px 0;
    display: block;
  }

  @media only screen and ${device.tabletSHeight} and ${device.tablet} {
    // margin: 8vh 0;
  }
`;

const CompanyName = styled.span`
  font-family: "Druk Wide Bold";
  font-size: 40px;

  @media only screen and ${device.tablet} {
    font-size: 35px;
  }

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    font-size: 30px;
  }

  @media only screen and ${device.mobileM} {
    font-size: 10vw;
  }
`;

const TagLine = styled.span`
  display: block;
  padding-top: 15px;
  font-size: 15px;
  font-weight: 400;
  color: ${theme.secondary};

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    padding-top: 5px;
    font-size: 12px;
  }

  @media only screen and ${device.mobileM} {
    font-size: 4vw;
  }
`;

const SectionWrapper = styled.div`
  display: flex;

  @media only screen and ${device.tablet} {
    height: auto;
    margin-top: auto;
    flex-direction: column;
  }

  @media only screen and ${device.tablet} and ${device.mobileHeight} {
    flex-direction: row;
  }

  @media only screen and ${device.mobileM} {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;

  @media only screen and ${device.tablet} {
    flex: 1;
  }
`;
const BulletPointSection = styled(Section)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 5px;
`;

const RolesWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const RoleWrapper = styled.div`
  max-width: 500px;
  padding-bottom: 12px;

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    padding-bottom: 0;
  }

  @media only screen and ${device.tablet} and ${device.mobileHeight} {
    max-width: 40vw;
  }

  @media only screen and ${device.mobileM} {
    max-width: 100%;
  }
`;

const SectionTitle = styled.span`
  display: block;
  padding: 15px 0;
  font-weight: 700;

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    padding: 5px 0;
    font-size: 15px;
  }
`;

const RoleText = styled.span`
  font-weight: 400;
  color: ${theme.secondary};
  font-size: 15px;
  line-height: 25px;

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    font-size: 13px;
  }
`;

const BulletPoint = styled.div`
  font-weight: 400;
  font-size: 17px;
  margin-bottom: 25px;
  line-height: 30px;

  &:last-child {
    // margin-bottom: 0;
  }

  @media only screen and ${device.tabletS},
    ${device.tablet} and ${device.mobileHeight} {
    font-size: 15px;
    line-height: 25px;
    margin-bottom: 12px;

    &:not(:first-of-type):not(:nth-of-type(2)) {
      display: none;
    }
  }

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    font-size: 12px;
    line-height: 22px;
  }

  @media only screen and (max-height: ${screenSize.tablet}px) {
    &:not(:first-of-type) {
      display: none;
    }
  }
`;

const TechnologyWrapper = styled.div`
  @media only screen and (max-height: 550px) {
    display: none;
  }
`;

const TechnologyImgWrapper = styled.div`
  width: 100%;
  // background: red;
  // min-height: 50px;
  width: 250px;
  display: grid;
  grid-row-gap: 25px;
  grid-column-gap: 15px;
  grid-template-columns: 1fr 1fr;
  padding: 10px 0;

  @media only screen and ${device.tabletS},
    ${device.tablet} and ${device.mobileHeight} {
    grid-row-gap: 15px;
    grid-column-gap: 10px;
    width: 180px;
  }
`;

const Technology = styled.img`
  width: 120px;
  height: 50px;
  border-radius: 15px;

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    width: 80px;
    height: 30px;
    border-radius: 5px;
  }

  @media only screen and ${device.tablet} and ${device.mobileHeight}, {
    &:not(:first-of-type):not(:nth-of-type(2)) {
      display: none;
    }
  }
`;

const ExperinceDiv = ({
  name,
  tagline,
  roles,
  points,
  section,
  percentage,
  activeSection,
  appState,
}) => {
  const breakingPointPercentage = appState === APP_STATE.MOBILE ? 60 : 40;
  const isPartialyVisible =
    section === activeSection - 1
      ? percentage > breakingPointPercentage
      : false;
  return (
    <ExperienceContainer
      style={{
        opacity:
          section < activeSection - 1
            ? 0
            : isPartialyVisible &&
              (percentage > 90 ? 0 : (100 - percentage) / 100),
      }}
    >
      <SectionWrapper>
        <Section>
          <CompanyName>{name}</CompanyName>
          <br />
          <TagLine>{tagline}</TagLine>
          <RolesWrapper>
            <SectionTitle>{roles.length > 1 ? "Roles" : "Role"}</SectionTitle>
            {roles.map((role) => (
              <RoleWrapper key={role.title}>
                <RoleText>{role.title}</RoleText>
                <br />
                <RoleText>
                  ({role.duration.start}-{role.duration.end})
                </RoleText>
              </RoleWrapper>
            ))}
          </RolesWrapper>
          <TechnologyWrapper>
            <SectionTitle>Technology</SectionTitle>
            <TechnologyImgWrapper>
              <Technology src="/static/django-logo-negative.png" />
              <Technology src="/static/handlebars.png" />
              <Technology src="static/jQuery-Logo.jpg" />
              <Technology src="/static/postgress.png" />
            </TechnologyImgWrapper>
          </TechnologyWrapper>
        </Section>

        <BulletPointSection>
          <SectionTitle>Highlights</SectionTitle>
          {points.map((point, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <BulletPoint key={idx}>{point}</BulletPoint>
          ))}
          <ButtonElement style={{ alignSelf: "self-start" }}>
            Learn More
          </ButtonElement>
        </BulletPointSection>
      </SectionWrapper>
    </ExperienceContainer>
  );
};

const ProgressBarWrapper = styled.div`
  width: 100vw;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 40px;

  @media only screen and ${device.tablet} {
    padding: 0 20px;
    display: none;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background: #808080;
  transition: width 0.5s ease-in;
  position: relative;
`;

const Filler = styled.div`
  position: absolute;
  top: 0;
  background: linear-gradient(to right, #b1c8fc, #bd4e72);
  bottom: 0;
  left: 0;
`;
const CheckPointsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -16px;

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    margin-top: -12px;
  }
`;

const CheckPoint = styled.div`
  width: 38px;
  height: 38px;
  background: ${theme.background};
  border-radius: 50%;
  border: solid 1px ${theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    width: 30px;
    height: 30px;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${theme.primary};

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.mobileHeight} {
    width: 8px;
    height: 8px;
  }
`;

const Observer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -1;
  // background: red;
  margin-top: 10vh;

  @media only screen and ${device.tablet} {
    margin-top: 0vh;
  }
`;

const ProgressBar = ({ top, left, completed }) => {
  const [state] = useContext(Context);

  // eslint-disable-next-line no-unused-vars
  const getOffset = ({ width, height }) => {
    if (height < 750) {
      return "75vh";
    }
    return "13.5%";
  };

  return (
    <ProgressBarWrapper
      style={{
        top: `calc(${top}px + ${getOffset(state.windowSize)})`,
        left,
      }}
    >
      <ProgressBarContainer>
        <Filler style={{ width: `${completed}%` }} />
        <CheckPointsWrapper>
          {data.map((item) => (
            <CheckPoint key={item.name}>
              <Dot />
            </CheckPoint>
          ))}
        </CheckPointsWrapper>
      </ProgressBarContainer>
    </ProgressBarWrapper>
  );
};

const eachSectionPercentage = 100 / data.length;

const Experince = () => {
  const ref = useRef(null);
  const [state, dispatch] = useContext(Context);
  const { mainScrollBar, scrollingPosition } = state;
  const [top, setTop] = useState(0);
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const { bounding, offset } = mainScrollBar || {};

  const refCallback = useCallback(
    (node) => {
      if (node) {
        dispatch({
          type: ADD_SECTION_ELEMENT,
          elementType: sections.work,
          element: node,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.appState]
  );

  const updateInnerWrapperPosition = () => {
    const widht = window?.innerWidth;
    const height = window?.innerHeight;
    const isLandscape = widht > height;
    // 100vh
    const vh = Math.round(isLandscape ? height : height * 0.9);
    if (
      ref.current &&
      mainScrollBar &&
      mainScrollBar.isVisible(ref.current) &&
      typeof window !== "undefined"
    ) {
      const targetBounding = ref.current.getBoundingClientRect();
      const targetTop = bounding.top - targetBounding.top;
      const targetBottom = targetBounding.bottom - bounding.bottom;

      if (
        targetTop > 0 &&
        targetBottom > 0 &&
        targetTop < ref.current.clientHeight - vh
      ) {
        const nextTop = bounding.top - targetBounding.top;
        setTop(nextTop);
      }
    } else if (offset.y < vh) {
      setTop(0);
    }
  };

  useEffect(() => {
    if (
      mainScrollBar &&
      ref.current &&
      // eslint-disable-next-line no-underscore-dangle
      !mainScrollBar._listeners.has(updateInnerWrapperPosition)
    ) {
      mainScrollBar.addListener(updateInnerWrapperPosition);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainScrollBar]);

  useEffect(() => {
    if (ref.current) {
      if (mainScrollBar && mainScrollBar.isVisible(ref.current)) {
        mainScrollBar.updatePluginOptions("horizontalScroll", { enable: true });
        const percentage =
          ((offset.y - bounding.top) * 100) / ref.current.offsetHeight;

        // Setting Max Value as 99.99 to make end scrolling smooth
        setPercentageCompleted(
          percentage > 100 ? 99.99 : Math.min(percentage, 99.99)
        );
      } else if (mainScrollBar) {
        mainScrollBar.updatePluginOptions("horizontalScroll", {
          enable: false,
        });
      } else {
        const percentage =
          (scrollingPosition.y * 100) / ref.current.offsetHeight;
        setPercentageCompleted(
          percentage > 100 ? 99.99 : Math.min(percentage, 99.99)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollingPosition.x, scrollingPosition.y]);

  // Main Logic For Moving the Experince Div Horizonatally
  const calcualteTransform = () => {
    const sectionPercentage =
      ((percentageCompleted % eachSectionPercentage) * 100) /
      eachSectionPercentage;
    const sectionOffset =
      (Math.ceil(percentageCompleted / eachSectionPercentage) - 2) * 100;

    // Using fallback value as 100, Just to avoid a weird condition when
    // sectionPercentage and sectonOffset becomes 0 in the starting of the second section.
    return sectionPercentage + sectionOffset || 100;
  };
  // Concept Inspiration: https://university.webflow.com/lesson/horizontal-scrolling
  return (
    <>
      <OuterWrapper ref={ref}>
        <SlidingHeading word="EXPERIENCES" />
        <Observer
          ref={refCallback}
          data-index={sections.work}
          style={{
            position: "absolute",
            top,
            left: scrollingPosition.x,
          }}
        />
        <InnerWrapper
          style={{
            transform: `translateX(${
              percentageCompleted < eachSectionPercentage
                ? "0"
                : `-${calcualteTransform()}`
            }vw)`,
            top,
            left: scrollingPosition.x,
          }}
        >
          {data.map((exp, idx) => (
            <ExperinceDiv
              key={exp.name}
              {...exp}
              section={idx + 1}
              activeSection={Math.ceil(
                percentageCompleted / eachSectionPercentage
              )}
              percentage={
                ((percentageCompleted % eachSectionPercentage) * 100) /
                eachSectionPercentage
              }
              appState={state.appState}
            />
          ))}
        </InnerWrapper>
        <ProgressBar
          top={top}
          left={scrollingPosition.x}
          completed={percentageCompleted}
        />
      </OuterWrapper>
    </>
  );
};

export default Experince;
