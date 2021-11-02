import React, { useState } from 'react'
// import Link from "next/link";
import styled from 'styled-components'
import theme from 'theme'
import { device } from '../utils'

const NavbarWraper = styled.div`
  height: 50px;
  padding: 15px 0;
  margin: 7px 30px;
  display: flex;

  @media ${device.tabletS} {
    justify-content: space-between;
    margin: 7px 20px;
  }
`

const NavbarItemsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  width: 100%;
  @media ${device.tabletS} {
    display: none;
  }
`

const NavLink = styled.li`
  font-size: 15px;
`

const Link = styled.a`
  text-decoration: none;
  font-weight: 400;
  border: solid ${theme.primary};
  border-width: ${(props) => (props.isActive ? '0.5px' : '0px')};
  border-radius: 20px;
  padding: 10px 25px;

  @media ${device.tabletS} {
    font-size: 13px;
    padding: 10px 20px;
  }
`

const MenuButton = styled(Link)`
  @media ${device.desktopL} {
    display: none;
  }

  @media ${device.tabletS} {
    display: inline;
  }
`

const LogoIcon = styled.a`
  font-family: "Druk Wide Bold";
`

const ThemeToggleWrapper = styled.div`
  width: 40px;
  min-height: 35px;
  position: relative;
  overflow: hidden;
  margin-top: -7px;
  border: solid 0.5px #676767;
  border-radius: 50%;
  cursor: pointer;
`

const ThemeToggler = styled.div`
  font-size: 25px;
  text-align: center;
`

const SunGlasses = styled.img`
  position: absolute;
  top: ${(props) => (props.isActive ? '-80' : '10')}px;
  width: 21px;
  right: 7px;
  transition: top 0.5s ease-in;
`

const navItems = [
  { title: 'Home', href: '#' },
  { title: 'About', href: '#' },
  { title: 'Resume', href: '#' },
  { title: 'Contact', href: '#' }
]

export const NavbarComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const [isLightMode, setsLightMode] = useState(false)

  const handleClick = (idx) => {
    setActiveIndex(idx)
  }
  return (
    <>
      <NavbarWraper>
        <LogoIcon> &#60;/R&#62; </LogoIcon>
        <NavbarItemsWrapper>
          {navItems.map((item, idx) => (
            <NavLink key={idx}>
              <Link
                href={item.href}
                isActive={activeIndex === idx}
                onClick={() => handleClick(idx)}
              >
                {item.title}
              </Link>
            </NavLink>
          ))}
        </NavbarItemsWrapper>
        <ThemeToggleWrapper onClick={() => setsLightMode(!isLightMode)}>
          <ThemeToggler>🙂</ThemeToggler>
          <SunGlasses src='static/sunglasses.png' isActive={isLightMode} />
        </ThemeToggleWrapper>

        {/* For Mobile or Smaller Devices */}
        <NavLink as='div'>
          <MenuButton href='#' isActive>
            Menu
          </MenuButton>
        </NavLink>
      </NavbarWraper>
    </>
  )
}
