import React, { useContext } from "react";
import styled from "styled-components";
import { SET_CURSOR_SCALE } from "../reducer";
import { Context } from "../store";
import { device } from "../utils";

const ButtonWrapper = styled.div`
  width: 180px;
  background: url(static/gradient-bg.png);
  border-radius: 12px;
  padding: 6px;
  align-self: center;
  filter: alpha(opacity=50);
  margin-top: 20px;
  position: relative;

  @media only screen and ${device.mobileL} {
    width: 40vw;
  }
`;

const Button = styled.div`
  background: url(static/gradient.png) no-repeat 40% 25%;
  border-radius: 12px;
  padding: 10px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  width: 100%;
  border: none;
  color: inherit;
  font-family: inherit;
  cursor: pointer;
  color: #ffffff;

  @media only screen and ${device.mobileL} {
    font-size: 3.5vw;
  }
`;

const ButtonElement = ({ children, style, ...extra }) => {
  const [, dispatch] = useContext(Context);
  return (
    <ButtonWrapper style={style}>
      <Button
        {...extra}
        style={extra?.buttonStyle}
        onMouseEnter={() => {
          dispatch({ type: SET_CURSOR_SCALE, cursorScale: 2 });
        }}
        onMouseLeave={() => {
          dispatch({ type: SET_CURSOR_SCALE, cursorScale: 1 });
        }}
      >
        {children}
      </Button>
    </ButtonWrapper>
  );
};

export default ButtonElement;
