import React from "react";
import styled from "styled-components";
import { device } from "../utils";

const FooterWrapper = styled.div`
  width: 100vw;
  display: flex;
  padding: 50px 20px;
  overflow: hidden;

  @media only screen and ${device.tabletS} {
    flex-direction: column;
  }
`;

const EndLine = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: #8c8c8c;
  flex: 1;

  @media only screen and ${device.tabletS} {
    margin-top: 20px;
    align-self: center;
    text-align: center;
    font-size: 4vw;
  }
`;

const SocialMediaHandleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  display: block;

  @media only screen and ${device.tabletS} {
    width: 100%;
    max-width: 300px;
    text-align: center;
    margin: 30px 0 0;
  }
`;

const SocialMediaLink = styled.a``;

const SocialMediaImg = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 20px;

  @media only screen and ${device.tabletS} {
    width: 20px;
    height: 20px;
  }
`;
function Footer() {
  return (
    <FooterWrapper>
      <EndLine>
        Designed and Developed with{" "}
        <span role="img" aria-label="heart">
          💙{" "}
        </span>
        by me! © 2021 Riken Shah&#39;s Portfolio
      </EndLine>
      <SocialMediaHandleWrapper>
        <SocialMediaLink href="https://github.com/Riken-Shah/" target="_blank">
          <SocialMediaImg src="static/github.svg" />
        </SocialMediaLink>
        <SocialMediaLink href="https://twitter.com/_RikenShah/" target="_blank">
          <SocialMediaImg src="static/twitter.svg" />
        </SocialMediaLink>
        <SocialMediaLink
          href="https://www.instagram.com/riken.py/"
          target="_blank"
        >
          <SocialMediaImg src="static/instagram.svg" />
        </SocialMediaLink>
        <SocialMediaLink
          href="https://www.linkedin.com/in/shah-riken/"
          target="_blank"
        >
          <SocialMediaImg src="static/linkedln.svg" />
        </SocialMediaLink>
      </SocialMediaHandleWrapper>
    </FooterWrapper>
  );
}

export default Footer;
