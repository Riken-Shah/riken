import styled from 'styled-components'

const screenSize = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tabletS: '550px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(max-width: ${screenSize.mobileS})`,
  mobileM: `(max-width: ${screenSize.mobileM})`,
  mobileL: `(max-width: ${screenSize.mobileL})`,
  tabletS: `(max-width: ${screenSize.tabletS})`,
  tablet: `(max-width: ${screenSize.tablet})`,
  laptop: `(max-width: ${screenSize.laptop})`,
  laptopL: `(max-width: ${screenSize.laptopL})`,
  desktop: `(max-width: ${screenSize.desktop})`,
  desktopL: `(max-width: ${screenSize.desktop})`
}

export const defaultSectionStyling = styled.div`
  margin: 0 30px;

  @media only screen and ${device.mobileL} {
    margin: 0 5px;
  }
`
