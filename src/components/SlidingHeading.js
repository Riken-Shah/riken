import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Context } from "../store";
import theme from "../theme";
import { device } from "../utils";

const OuterWraper = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  overflow: hidden;
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
  color: ${(props) => (props.isBorder ? theme.background : theme.primary)};
  text-shadow: ${(props) =>
    props.isBorder
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
  const { mainScrollBar, scrollingPosition } = state;
  const [completedPercentage, setCompletedPercentage] = useState(null);

  const ref = useRef();

  useEffect(() => {
    if (ref.current && mainScrollBar && mainScrollBar.isVisible(ref.current)) {
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
            transform: `translateX(calc(-50% - ${completedPercentage * 0.5}%))`,
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
