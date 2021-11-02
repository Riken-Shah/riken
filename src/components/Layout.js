import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { NavbarComponent } from './Navbar'
import { ProgressBarComponent } from './ProgressBar'
import { calculateScrollPercenatage, device } from '../utils'

const LayoutComponent = styled.div`
  margin: 0 30px;

  @media ${device.mobileL} {
    margin: 0 5px;
  }
`

const Layout = (props) => {
  const ref = useRef(null)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setPercentage(calculateScrollPercenatage(ref.current))
    }
  })

  return (
    <>
      <NavbarComponent />
      <ProgressBarComponent width={percentage} />
      <LayoutComponent ref={ref}>{props.children}</LayoutComponent>
    </>
  )
}

export default Layout
