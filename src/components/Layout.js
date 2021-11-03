import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavbarComponent } from './Navbar'
import { ProgressBarComponent } from './ProgressBar'
import { Scrollbar } from 'smooth-scrollbar-react'
import { Context } from '../store'
import { UPDATE_SCROLLING_DATA } from '../Reducer'

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
`

const Main = styled.div``

const Layout = (props) => {
  const [, dispatch] = useContext(Context)

  function updateScrollingData (_, scrollBar) {
    const x = scrollBar.scrollTop
    const y = scrollBar.scrollLeft

    dispatch({
      type: UPDATE_SCROLLING_DATA,
      x,
      y
    })
  }
  return (
    <>
      <NavbarComponent />
      <ProgressBarComponent />
      <LayoutComponent id='main'>
        <Scrollbar
          plugins={{ overscroll: { effect: 'bounce' } }}
          onScroll={updateScrollingData}
        >
          <Main>{props.children}</Main>
        </Scrollbar>
      </LayoutComponent>
    </>
  )
}

export default Layout
