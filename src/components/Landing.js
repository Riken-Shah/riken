import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import { ADD_SECTION_ELEMENT } from "../reducer";
import { Context, sections } from "../store";
import { defaultSectionStyling, device } from "../utils";
import Button from "./Button";

const LandingWrapper = styled(defaultSectionStyling)`
  height: calc(100vh - 70px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and ${device.mobileHeight} and ${device.tablet} {
    margin-top: 70px;
  }
`;

const Section = styled.div`
  text-align: center;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IntroSpan = styled.span`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 12px;

  @media only screen and ${device.mobileL} {
    font-size: 3vw;
  }

  @media only screen and ${device.laptop} and ${device.landscape} {
    font-size: 2vw;
  }
`;

const HeadingText = styled.span`
  font-size: 40px;
  margin-bottom: 12px;
  font-family: "Druk Wide Bold";

  @media only screen and ${device.tablet} {
    font-size: 28px;
  }

  @media only screen and ${device.tabletS} {
    font-size: 5vw;
  }

  @media only screen and ${device.laptop} and ${device.landscape} {
    font-size: 3vw;
  }
`;

const FloatingElements = styled.div`
  background: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top || "unset"};
  left: ${(props) => props.left || "unset"};
  bottom: ${(props) => props.bottom || "unset"};
  right: ${(props) => props.right || "unset"};
  position: absolute;
  animation: float 2s infinite ease-in-out;
  @keyframes float {
    0% {
      transform: translateY(${(props) => props.top || props.bottom});
    }
    50% {
      transform: translateY(
        calc(${(props) => props.top || props.bottom} - 10px)
      );
    }
    100% {
      transform: translateY(${(props) => props.top || props.bottom});
    }
  }

  @media only screen and ${device.laptop} and ${device.landscape} {
    width: 10vw;
    height: 10vw;
  }

  @media only screen and ${device.mobileL},
    ${device.tablet} and ${device.potrait} {
    width: 15vw;
    height: 15vw;
  }
`;

function LandingComponent() {
  // const [moveX, setMoveX] = useState(0);
  // const [moveY, setMoveY] = useState(0);
  // const ref = useRef(null);

  // const handleMouseMove = (e) => {
  //   const { clientX, clientY } = e;
  //   const { clientWidth, clientHeight } = ref.current;

  //   const Xpercenatage = (clientX * 100) / clientWidth - 50;
  //   const Ypercenatage = (clientY * 100) / clientHeight - 50;
  //   setMoveX(Xpercenatage * 0.6);
  //   setMoveY(Ypercenatage * 0.8);
  // };

  // // eslint-disable-next-line consistent-return
  // useEffect(() => {
  //   if (ref.current) {
  //     const elem = ref.current;
  //     elem.addEventListener("mousemove", handleMouseMove);
  //     return () => elem.removeEventListener("mousemove", handleMouseMove);
  //   }
  // }, []);

  const [state, dispatch] = useContext(Context);
  const refCallback = useCallback(
    (node) => {
      if (node) {
        dispatch({
          type: ADD_SECTION_ELEMENT,
          elementType: sections.home,
          element: node,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.appState]
  );

  return (
    <LandingWrapper ref={refCallback} data-index={sections.home}>
      <Section>
        <IntroSpan>
          Namaste, I am Riken Shah{" "}
          <span role="img" aria-label="hi">
            🙏
          </span>
        </IntroSpan>
        <HeadingText>Contemplative coder;</HeadingText>
        <HeadingText>Who Loves to Solve Interesting Ideas</HeadingText>
        <Button>
          Say Hi{" "}
          <span role="img" aria-label="hi">
            👋
          </span>
        </Button>
      </Section>
      <FloatingElements
        url="static/3d-brackets.png"
        width={120}
        height={100}
        left="15%"
        bottom="15%"
        style={
          {
            // bottom: `calc(15% - ${scrollingPosition.y * 0.1}px)`,
            // transform: `rotateX(${moveX}deg) rotateY(${moveY}deg)`,
          }
        }
      />
      <FloatingElements
        url="static/3d-semicolon.png"
        width={120}
        height={100}
        top="20%"
        // top={`calc(10% + ${scrollingPosition.y * 0.3}px)`}
        style={
          {
            // top: `calc(10% + ${scrollingPosition.y * 0.2}px)`,
            // transform: `rotateX(${moveX}deg) rotateY(${moveY}deg)`,
          }
        }
        right="15%"
      />
    </LandingWrapper>
  );
}

export default LandingComponent;
