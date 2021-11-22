import React, {
  useContext,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import scrollbar from "../utils/scrollbar";
import NavbarComponent from "./Navbar";
import Footer from "./Footer";
import ProgressBarComponent from "./ProgressBar";
import { Context, themes } from "../store";
import {
  APP_STATE,
  SET_APP_STATE,
  SET_MAIN_SCROLLBAR_INSTANCE,
  UPDATE_SCROLLING_DATA,
  WINDOW_RESIZE,
  SET_OBSERVER,
  SET_VISIBLE_SECTION,
} from "../reducer";
import { device, screenSize } from "../utils";

const LayoutComponent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-height: 1000vh;
  // background: green;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // margin-top: 70px;

  @media only screen and ${device.tablet} {
    position: static;
    margin-top: 0px;
  }
`;

const Header = styled.div`
  position: fixed;
  background: black;
  width: 100%;
  z-index: 1;
  @media only screen and ${device.tablet} {
    position: fixed;
    width: 100%;
    background: ${({ theme }) => theme.background};
    z-index: 5;
  }
`;

const Main = styled.div`
  overflow: hidden;
`;

const CustomCursor = styled.div`
  width: 30px;
  height: 30px;
  background: #ffffff;
  border-radius: 50%;
  position: fixed;
  transition: transform 0.5s ease-in;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: ${(themeName) =>
    themeName === themes.DARK ? "difference" : "exclusion"};

  @media only screen and ${device.tablet} {
    display: none;
  }
`;

const AnimationZoom = styled.div`
  // position: absolute;
  width: auto;
  height: auto;
  // width: 100vw;
  // height: 100vh;
  top: 0;
  left: 0;
  // overflow: hidden;
  // pointer-events: none;

  &::before {
    content: "";
    pointer-events: none;
    width: 20px;
    height: 20px;
    position: absolute;
    background: #ffffff;
    // top: 20%;
    // left: 15%;
    top: 0;
    left: 0;
    border-radius: 50%;
    transition: all 10s ease-in-out;
    transition-property: transform;
    mix-blend-mode: exclusion;
    z-index: 1;
    transform: scale(0);
  }

  &.active {
    &::before {
      transform: scale(150);
    }
  }
`;

const Layout = ({ children, setTheme }) => {
  const [state, dispatch] = useContext(Context);
  const [isAllElemObserved, setIsAllElemObserved] = useState(false);
  const desktopObserver = useRef(null);
  const cursorRef = useRef(null);
  const [themeChanging, setThemeChanging] = useState(false);
  const AnimationRef = useRef(null);
  const HeaderRef = useRef(null);
  const ProgressBarRef = useRef(null);
  function updateScrollingData(scrollBar) {
    let [x, y] = [0, 0];
    if (scrollBar?.offset) {
      x = scrollBar.offset.x;
      y = scrollBar.offset.y;
    } else {
      x = window?.scrollX;
      y = window?.scrollY;
    }

    // if (AnimationRef.current) {
    //   AnimationRef.current.style.top = CSS.px(y);
    // }
    if (HeaderRef.current) {
      HeaderRef.current.style.top = CSS.px(y);
    }
    if (ProgressBarRef.current) {
      ProgressBarRef.current.style.top = CSS.px(y + 60);
    }

    dispatch({
      type: UPDATE_SCROLLING_DATA,
      x,
      y,
    });
  }

  function handleResize() {
    // Set window width/height to state
    dispatch({
      type: WINDOW_RESIZE,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  function handleMouseMove(e, cursor) {
    if (cursor) {
      // eslint-disable-next-line no-param-reassign
      cursor.style.left = CSS.px(e.clientX);
      // eslint-disable-next-line no-param-reassign
      cursor.style.top = CSS.px(e.clientY);
    }
  }

  const refCallback = useCallback((node) => {
    if (node) {
      window?.removeEventListener("scroll", updateScrollingData);

      const mainScrollBar = scrollbar.init(node, {
        // damping: 0.1,
        // renderByPixels: true,
      });
      dispatch({ type: SET_MAIN_SCROLLBAR_INSTANCE, mainScrollBar });
      dispatch({ type: SET_APP_STATE, appState: APP_STATE.DESKTOP });

      mainScrollBar.addListener(updateScrollingData);
      mainScrollBar.addListener(handleResize);
      mainScrollBar.scrollTo(
        state.scrollingPosition?.x,
        state.scrollingPosition?.y
      );
    } else {
      // Destorying the root scrollbar to avoid any issue
      scrollbar.destroyAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Window Resize

    if (typeof window !== "undefined") {
      // Add event listener
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", (e) =>
        handleMouseMove(e, cursorRef.current)
      );

      const observer = new window.IntersectionObserver(
        (entries) => {
          // eslint-disable-next-line array-callback-return
          entries.map((entry) => {
            if (entry.isIntersecting) {
              dispatch({
                type: SET_VISIBLE_SECTION,
                item: entry.target.getAttribute("data-index"),
              });
            }
          });
        },
        {
          root:
            state.appState === APP_STATE.DESKTOP
              ? desktopObserver.current
              : undefined,
          threshold: state.appState === APP_STATE.DESKTOP ? 0.5 : 0.1,
        }
      );

      dispatch({ type: SET_OBSERVER, observer });

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.rootObserver) {
      state.sectionElements.forEach((elem) => state.rootObserver.observe(elem));
      setIsAllElemObserved(true);
    }
    return () => {
      if (
        isAllElemObserved &&
        state.rootObserver &&
        state.sectionElements.size === 4
      ) {
        state.sectionElements.forEach((elem) =>
          state.rootObserver.unobserve(elem)
        );
      }
    };
  }, [isAllElemObserved, state.rootObserver, state.sectionElements]);

  useEffect(() => {
    if (
      state.windowSize.width <= screenSize.tablet &&
      state.appState !== APP_STATE.MOBILE
    ) {
      dispatch({ type: SET_MAIN_SCROLLBAR_INSTANCE, mainScrollBar: null });
      dispatch({ type: SET_APP_STATE, appState: APP_STATE.MOBILE });
      window.scrollTo(state.scrollingPosition?.x, state.scrollingPosition?.y);
      window?.addEventListener("scroll", updateScrollingData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.windowSize?.width, state.windowSize?.height]);

  useEffect(() => {
    let timeout;
    if (themeChanging) {
      timeout = setTimeout(() => setThemeChanging(false), 12223000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [themeChanging]);

  return (
    <>
      <LayoutComponent id="main" ref={desktopObserver}>
        {state.windowSize.width > screenSize.tablet ? (
          <Main ref={refCallback}>
            <AnimationZoom
              ref={AnimationRef}
              className={themeChanging && "active"}
              // style={{ top: state.scrollingPosition.y }}
            >
              <Header
                // style={{ top: state.mainScrollBar?.offset?.y ?? 0 }}
                ref={HeaderRef}
              >
                <NavbarComponent
                  setTheme={setTheme}
                  setThemeChanging={setThemeChanging}
                />
              </Header>
              <div
                style={{
                  position: "absolute",
                  height: "4px",
                  zIndex: 2,
                  background: "linear-gradient(to right, #b1c8fc, #bd4e72)",
                  width: "100%",
                }}
                ref={ProgressBarRef}
              />

              <div style={{ marginTop: "70px", display: "block" }}>
                {children}
              </div>
            </AnimationZoom>
            <ProgressBarComponent />
            <Footer />
          </Main>
        ) : (
          <Main>
            <Header>
              <NavbarComponent
                setTheme={setTheme}
                setThemeChanging={setThemeChanging}
              />
              <ProgressBarComponent />
            </Header>
            <AnimationZoom className={themeChanging && "active"} />
            {children}
            <ProgressBarComponent />
            <Footer />
          </Main>
        )}
      </LayoutComponent>
      <CustomCursor
        className="custom-cursor"
        themeName={state.theme}
        ref={cursorRef}
        style={{
          transform: `scale(${state.cursorScale}) translate(${
            -50 / state.cursorScale
          }%, ${-50 / state.cursorScale}%)`,
        }}
      />
    </>
  );
};

export default Layout;
