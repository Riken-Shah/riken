import React from "react";
import styled from "styled-components";
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
    width: 150px;
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

  @media only screen and ${device.mobileL} {
    font-size: 12px;
  }
`;

const ButtonElement = ({ children, style, ...extra }) => (
  <ButtonWrapper style={style}>
    <Button {...extra} style={extra?.buttonStyle}>
      {children}
    </Button>
  </ButtonWrapper>
);

export default ButtonElement;
