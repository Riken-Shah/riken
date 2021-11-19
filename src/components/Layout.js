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
import { Context } from "../store";
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
import theme from "../theme";

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
  margin-top: 70px;

  @media only screen and ${device.tablet} {
    position: static;
    margin-top: 0px;
  }
`;

const Header = styled.div`
  @media only screen and ${device.tablet} {
    position: fixed;
    width: 100%;
    background: ${theme.background};
    z-index: 5;
  }
`;

const Main = styled.div`
  overflow: hidden;
`;

const CustomCursor = styled.div`
  width: 30px;
  height: 30px;
  background: ${theme.primary};
  border-radius: 50%;
  position: fixed;
  transition: transform 0.5s ease-in;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: difference;

  @media only screen and ${device.tablet} {
    display: none;
  }
`;

const Layout = ({ children }) => {
  const [state, dispatch] = useContext(Context);
  const [isAllElemObserved, setIsAllElemObserved] = useState(false);
  const desktopObserver = useRef(null);
  const cursorRef = useRef(null);

  function updateScrollingData(scrollBar) {
    let [x, y] = [0, 0];
    if (scrollBar?.offset) {
      x = scrollBar.offset.x;
      y = scrollBar.offset.y;
    } else {
      x = window?.scrollX;
      y = window?.scrollY;
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
        damping: 0.025,
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

  return (
    <>
      <Header>
        <NavbarComponent />
        <ProgressBarComponent />
      </Header>
      <LayoutComponent id="main" ref={desktopObserver}>
        {state.windowSize.width > screenSize.tablet ? (
          <Main ref={refCallback}>
            {children}
            <ProgressBarComponent />
            <Footer />
          </Main>
        ) : (
          <Main>
            {children}
            <ProgressBarComponent />
            <Footer />
          </Main>
        )}
      </LayoutComponent>
      <CustomCursor
        className="custom-cursor"
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
