import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../store";
import theme from "../theme";
import { device } from "../utils";

const Wrapper = styled.div`
  overflow: hidden;
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

  return (
    <Wrapper>
      <div
        style={{
          transform: `translateX(calc(-50% - ${
            state.scrollingPosition.x * 0.5
          }px))`,
        }}
      >
        {new Array(6).fill(1).map((s, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Word key={idx} isBorder={idx % 2}>
            {word}
          </Word>
        ))}
      </div>
    </Wrapper>
  );
}

export default SlidingHeading;
