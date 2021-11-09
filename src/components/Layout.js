import React, { useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import scrollbar from "../utils/scrollbar";
import NavbarComponent from "./Navbar";
import ProgressBarComponent from "./ProgressBar";
import { Context } from "../store";
import { SET_MAIN_SCROLLBAR_INSTANCE, UPDATE_SCROLLING_DATA } from "../reducer";

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
`;

const Main = styled.div``;

const Layout = ({ children }) => {
  const [, dispatch] = useContext(Context);
  const ref = useRef(null);

  function updateScrollingData(scrollBar) {
    const { x, y } = scrollBar.offset;

    dispatch({
      type: UPDATE_SCROLLING_DATA,
      x,
      y,
    });
  }

  useEffect(() => {
    if (ref.current) {
      const mainScrollBar = scrollbar.init(ref.current, {
        onScroll: updateScrollingData,
        damping: 0.025,
        // damping: 0.1,
      });
      mainScrollBar.addListener(updateScrollingData);
      dispatch({ type: SET_MAIN_SCROLLBAR_INSTANCE, mainScrollBar });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavbarComponent />
      <ProgressBarComponent />
      <LayoutComponent id="main">
        <Main ref={ref}>{children}</Main>
      </LayoutComponent>
    </>
  );
};

export default Layout;
