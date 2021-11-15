import styled from "styled-components";

export const screenSize = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tabletS: 550,
  tablet: 768,
  laptopS: 960,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const device = {
  mobileS: `(max-width: ${screenSize.mobileS}px)`,
  mobileM: `(max-width: ${screenSize.mobileM}px)`,
  mobileL: `(max-width: ${screenSize.mobileL}px)`,
  tabletS: `(max-width: ${screenSize.tabletS}px)`,
  tablet: `(max-width: ${screenSize.tablet}px)`,
  laptopS: `(max-width: ${screenSize.laptopS}px)`,
  laptop: `(max-width: ${screenSize.laptop}px)`,
  laptopL: `(max-width: ${screenSize.laptopL}px)`,
  desktop: `(max-width: ${screenSize.desktop}px)`,
  desktopL: `(max-width: ${screenSize.desktop}px)`,
  landscape: `(orientation: landscape)`,
  potrait: `(orientation: potrait)`,
  mobileHeight: `(max-height: 600px)`,
  tabletSHeight: `(max-height: 720px)`,
};

export const defaultSectionStyling = styled.div`
  margin: 0 30px;

  @media only screen and ${device.mobileL} {
    margin: 0 5px;
  }
`;
