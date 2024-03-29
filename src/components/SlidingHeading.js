import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { APP_STATE } from "../reducer";
import { Context } from "../store";
import { device } from "../utils";

const OuterWraper = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  overflow: hidden;
  transition: all 0.5s ease;
`;

const Observer = styled.div`
  height: 100vh;
  width: 100vw;
  // background: yellow;
  position: absolute;
  top: -50vh;
  left: 0;
  z-index: -1;
`;

const Word = styled.span`
  font-family: "Druk Wide Bold";
  color: ${({ isBorder, theme }) =>
    isBorder ? theme.background : theme.primary};
  text-shadow: ${({ theme, isBorder }) =>
    isBorder
      ? `-1px -1px 0 ${theme.primary}, 1px -1px 0 ${theme.primary}, -1px 1px 0 ${theme.primary}, 1px 1px 0 ${theme.primary}`
      : "none"};
  font-size: 60px;
  margin-left: 20px;

  @media only screen and ${device.tablet} {
    font-size: 40px;
  }

  @media only screen and ${device.mobileL} {
    font-size: 30px;
  }
`;

function SlidingHeading({ word }) {
  const [state] = useContext(Context);
  const { mainScrollBar, scrollingPosition, appState } = state;
  const [completedPercentage, setCompletedPercentage] = useState(null);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const targetElement = ref.current.getBoundingClientRect();
      const relativeTop = targetElement.height - targetElement.top;
      setCompletedPercentage((relativeTop * 100) / targetElement.height - 50);
    }
  }, [mainScrollBar, scrollingPosition.y]);

  return (
    <OuterWraper>
      <Wrapper>
        <div
          style={{
            transform: `translateX(calc(-50% - ${
              completedPercentage *
              (appState === APP_STATE.DESKTOP ? 0.1 : 0.15)
            }%))`,
          }}
        >
          {new Array(16).fill(1).map((s, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Word key={idx} isBorder={idx % 2}>
              {word}
            </Word>
          ))}
        </div>
      </Wrapper>
      <Observer ref={ref} />
    </OuterWraper>
  );
}

export default SlidingHeading;
