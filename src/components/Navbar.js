import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { APP_STATE, SET_CURSOR_SCALE, SET_THEME } from "../reducer";
import { Context, themes } from "../store";
import { device } from "../utils";

const NavbarWraper = styled.div`
  height: 50px;
  padding: 15px 0;
  margin: 7px 30px;
  display: flex;
  @media only screen and ${device.tablet} {
    justify-content: space-between;
    margin: 7px 20px;
  }
`;

const NavbarItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0 25px;
  width: 100%;
  position: relative;

  @media only screen and ${device.tablet} {
    display: none;
  }
`;

const NavLink = styled.li`
  font-size: 15px;
  flex: 1;
  text-align: center;
`;

const ResumeLink = styled(NavLink)`
  @media only screen and ${device.tablet} {
    display: none;
  }
`;

const MobileNavLink = styled(NavLink)`
  flex: 0;
  margintop: 2px;
  border-radius: 50%;
  display: block;
`;

const Link = styled.a`
  text-decoration: none;
  font-weight: 400;
  cursor: pointer;
  border: solid ${({ theme }) => theme.primary};
  border-width: ${(props) => (props.isActive ? "0.5px" : "0px")};
  border-radius: 20px;
  padding: 10px 25px;

  @media only screen and ${device.tablet} {
    font-size: 13px;
    // padding: 10px 20px;
  }
`;

const MenuButton = styled(Link)`
  z-index: 4;
  flex: 0;
  display: block;
  width: 80px;
  height: 35px;
  margin-top: -7px;
  // padding: 20px;

  position: relative;
  @media only screen and ${device.desktopL} {
    display: none;
  }

  @media only screen and ${device.tablet} {
    display: block;
  }
`;

const MenuButtonText = styled.span`
  display: block;
  position: absolute;
  left: 20px;
  top: 8px;
  transition: all 0.8s ease;
`;

const MobileResumeButton = styled(MenuButton)`
  position: fixed;
  top: 0;
  left: 0;
  margin: 15px 0 0 20px;
  text-align: center;
  z-index: 7;
`;

const LogoIcon = styled.a`
  font-family: "Druk Wide Bold";
`;

const ThemeToggleWrapper = styled.div`
  width: 40px;
  margin-right: 20px;
  min-height: 35px;
  position: relative;
  overflow: hidden;
  margin-top: -7px;
  border: solid 0.5px #676767;
  border-radius: 50%;
  cursor: pointer;
`;

const ThemeToggler = styled.div`
  font-size: 25px;
  text-align: center;
`;

const SunGlasses = styled.img`
  position: absolute;
  top: ${(props) => (props.isActive ? "-80" : "10")}px;
  width: 21px;
  right: 7px;
  transition: top 0.5s ease-in;
`;

const ActiveDotWrapper = styled.div`
  width: 100%;
  height: 12px;
  position: absolute;
  bottom: -80%;
  left: 0;
  // background: red;
`;

const ActiveDot = styled.div`
  width: 5px;
  height: 5px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  position: absolute;
  transition: all 1s ease;
`;

const MobileNavbarWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: -1;
`;

const MobileNavbarBackground = styled.div`
  width: 100vh;
  height: 100vh;
  background: ${({ theme }) => theme.secondaryLight};
  position: absolute;
  top: -70vh;
  left: 101vw;
  transition: all 1s ease-in-out;
  border-radius: 50%;
`;

const MobileNavbarContent = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background: transparent;
  opacity: 0;
  transition: all 0.3s ease-in;
  position: relative;
  padding: 0 10px 20px 30px;
  margin-top: 25vw;

  text-align: left;

  @media only screen and ${device.tablet} and ${device.landscape} {
    // padding-top: 13vw;
    margin-top: 20vh;
  }
`;

const MobileWrapperActiveDot = styled(ActiveDot)`
  display: ${(props) => (props.isActive ? "block" : "none")};
  position: absolute;
  width: 2vw;
  height: 2vw;
  top: 50%;
  left: -3%;

  @media only screen and ${device.tablet} and ${device.landscape} {
    width: 2vh;
    height: 2vh;
    left: -2%;
  }
`;

const MobileNavbarMenuItem = styled.div`
  font-family: "Druk Wide Bold";
  font-size: 12vw;
  padding: 10px;
  display: block;
  color: ${({ isActive, theme }) =>
    isActive ? theme.secondaryLight : theme.primary};
  text-shadow: ${({ isActive, theme }) =>
    isActive
      ? `-1px -1px 0 ${theme.primary}, 1px -1px 0 ${theme.primary}, -1px 1px 0 ${theme.primary}, 1px 1px 0 ${theme.primary}`
      : "none"};

  @media only screen and ${device.tablet} and ${device.landscape} {
    font-size: 15vh;
  }
`;

const MobileNavbarMenuItemWrapper = styled.div`
  position: relative;

  &:last-of-type {
    margin-bottom: 35px;
  }
`;

const navItems = [
  { title: "Home", centerOffset: "30px" },
  { title: "Work", centerOffset: "43px" },
  { title: "Project", centerOffset: "18px" },
  { title: "Contact", centerOffset: "6px" },
];

const NavbarComponent = ({ setTheme }) => {
  const [state, dispatch] = useContext(Context);
  const activeSection = parseInt(state.activeSection, 10);
  const [elementsRef, setElementsRef] = useState(new Map());
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const [showMobileNavbarContent, setShowMobileNavbarContent] = useState(false);
  const [middlePosition, setMiddlePosition] = useState(0);

  const handleClick = (idx) => {
    const target = state.sectionElements?.get(idx);
    if (state.appState === APP_STATE.DESKTOP) {
      state.mainScrollBar?.scrollIntoView(target);
    } else {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  const handleThemeChange = () => {
    if (state.theme === themes.DARK) {
      dispatch({ type: SET_THEME, theme: themes.LIGHT });
      setTheme(themes.LIGHT);
    } else {
      dispatch({ type: SET_THEME, theme: themes.DARK });
      setTheme(themes.DARK);
    }
  };

  const calculateMiddlePosition = (section) => {
    const elem = elementsRef.get(section);

    if (elem) {
      const rect = elem.getBoundingClientRect();
      return rect.left - rect.width;
    }
    return 0;
  };
  const handleMobileNavbar = (e) => {
    e.preventDefault();
    setOpenMobileNavbar(!openMobileNavbar);
  };

  const handleMobileMenuItemClick = (section) => {
    setOpenMobileNavbar(false);
    const timeout = setTimeout(() => handleClick(section), 800);
    return () => clearTimeout(timeout);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (state.appState === APP_STATE.MOBILE) {
      const timeout = setTimeout(
        () => setShowMobileNavbarContent(openMobileNavbar),
        1000
      );
      if (openMobileNavbar) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "inherit";
      }
      return () => clearTimeout(timeout);
      // eslint-disable-next-line no-else-return
    } else {
      setOpenMobileNavbar(false);
      setShowMobileNavbarContent(false);
    }
  }, [openMobileNavbar, state.appState]);

  useEffect(() => {
    setMiddlePosition(
      `${calculateMiddlePosition(activeSection)}px - ${
        navItems[activeSection]?.centerOffset
      }`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, state.windowSize.width, state.windowSize.height]);

  return (
    <>
      <NavbarWraper>
        <LogoIcon> &#60;/R&#62; </LogoIcon>
        <NavbarItemsWrapper>
          {navItems.map((item, idx) => (
            <NavLink
              key={item.title}
              onMouseEnter={() => {
                dispatch({ type: SET_CURSOR_SCALE, cursorScale: 2 });
              }}
              onMouseLeave={() => {
                dispatch({ type: SET_CURSOR_SCALE, cursorScale: 1 });
              }}
            >
              <Link
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(idx);
                }}
              >
                <span
                  ref={(ref) => {
                    if (
                      elementsRef.size !== navItems.length &&
                      !elementsRef.get(idx)
                    ) {
                      elementsRef.set(idx, ref);
                      setElementsRef(elementsRef);
                    }
                  }}
                >
                  {item.title}
                </span>
              </Link>
            </NavLink>
          ))}
          <ActiveDotWrapper>
            <ActiveDot
              style={{
                left: `calc(${middlePosition})`,
              }}
            />
          </ActiveDotWrapper>
        </NavbarItemsWrapper>
        <ThemeToggleWrapper onClick={handleThemeChange}>
          <ThemeToggler>
            <span role="img" aria-label="smile">
              🙂
            </span>
          </ThemeToggler>
          <SunGlasses
            src="static/sunglasses.png"
            isActive={state.theme === themes.DARK}
          />
        </ThemeToggleWrapper>
        <ResumeLink
          as="div"
          onMouseEnter={() => {
            dispatch({ type: SET_CURSOR_SCALE, cursorScale: 2 });
          }}
          onMouseLeave={() => {
            dispatch({ type: SET_CURSOR_SCALE, cursorScale: 1 });
          }}
        >
          <Link href="/resume.pdf" target="_blank" isActive>
            <span>Résumé</span>
          </Link>
        </ResumeLink>

        {/* For Mobile or Smaller Devices */}
        <MobileNavLink as="div" onClick={handleMobileNavbar}>
          <MenuButton isActive onClick={handleMobileNavbar}>
            <MenuButtonText
              style={{
                opacity: openMobileNavbar ? 0 : 1,
                transform: openMobileNavbar
                  ? "translateX(-69px)"
                  : "translateX(0px)",
              }}
            >
              Menu
            </MenuButtonText>
            <MenuButtonText
              style={{
                opacity: openMobileNavbar ? 1 : 0,
                transform: openMobileNavbar
                  ? "translateX(0px)"
                  : "translateX(70px)",
                left: "18px",
              }}
            >
              Cancel
            </MenuButtonText>
          </MenuButton>
        </MobileNavLink>
        {state.appState === APP_STATE.MOBILE && (
          <MobileNavbarWrapper
            style={{
              zIndex: openMobileNavbar || showMobileNavbarContent ? 1 : -1,
              visibility: openMobileNavbar ? "visible" : "hidden",
            }}
          >
            <MobileNavbarBackground
              style={{
                transform: openMobileNavbar ? "scale(8)" : "scale(0)",
                zIndex: openMobileNavbar && !showMobileNavbarContent ? 2 : -1,
              }}
            />
            <MobileNavbarContent
              style={{
                opacity: openMobileNavbar && showMobileNavbarContent ? 1 : 0,
                zIndex: openMobileNavbar ? 3 : -1,
                visibility: openMobileNavbar ? "visible" : "hidden",
              }}
            >
              <MobileResumeButton
                as="a"
                href="/resume.pdf"
                target="_blank"
                isActive
              >
                <MenuButtonText style={{ left: "13px" }}>Résumé</MenuButtonText>
              </MobileResumeButton>
              {navItems.map((item, idx) => (
                <>
                  <MobileNavbarMenuItemWrapper>
                    <MobileWrapperActiveDot isActive={idx === activeSection} />
                    <MobileNavbarMenuItem
                      key={item}
                      as="span"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileMenuItemClick(idx);
                      }}
                      isActive={idx === activeSection}
                    >
                      {item.title}
                    </MobileNavbarMenuItem>
                  </MobileNavbarMenuItemWrapper>
                  <br />
                </>
              ))}
            </MobileNavbarContent>
          </MobileNavbarWrapper>
        )}
      </NavbarWraper>
    </>
  );
};

export default NavbarComponent;
