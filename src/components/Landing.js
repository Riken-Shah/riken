import React from 'react'
import styled from 'styled-components'
import { device } from '../utils'

const LandingWrapper = styled.div`
  height: calc(100vh - 70px);
  position: relative;
`

const Section = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
`

const IntroSpan = styled.span`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 12px;

  @media only screen and ${device.mobileL} {
    font-size: 16px;
  }
`

const HeadingText = styled.span`
  font-size: 40px;
  margin-bottom: 12px;
  font-family: "Druk Wide Bold";

  @media only screen and ${device.tablet} {
    font-size: 28px;
  }

  @media only screen and ${device.mobileL} {
    font-size: 21px;
  }
`

const ButtonWrapper = styled.div`
  width: 180px;
  background: url(static/gradient-bg.png);
  border-radius: 12px;
  padding: 6px;
  align-self: center;
  filter: alpha(opacity=50);
  margin-top: 20px;

  @media only screen and ${device.mobileL} {
    width: 150px;
  }
`

const Button = styled.div`
  background: url(static/gradient.png) no-repeat 40% 25%;
  border-radius: 12px;
  padding: 10px;
  font-weight: 600;
  font-size: 14px;

  @media only screen and ${device.mobileL} {
    font-size: 12px;
  }
`

const FloatingElements = styled.div`
  background: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  position: absolute;
`

export const LandingComponent = () => {
  return (
    <LandingWrapper>
      <Section>
        <IntroSpan>Namaste, I am Riken Shah 🙏 </IntroSpan>
        <HeadingText>Contemplative coder;</HeadingText>
        <HeadingText>Who Loves to Solve Interesting Ideas</HeadingText>
        <ButtonWrapper>
          <Button>Say Hi 👋</Button>
        </ButtonWrapper>
      </Section>
      <FloatingElements
        url={'static/3d-brackets.png'}
        width={120}
        height={100}
        bottom={'10%'}
        left={'15%'}
      />
      <FloatingElements
        url={'static/3d-semicolon.png'}
        width={120}
        height={100}
        top={'10%'}
        right={'15%'}
      />
    </LandingWrapper>
  )
}
