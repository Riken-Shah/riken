import React from "react";
import styled from "styled-components";
import { defaultSectionStyling } from "../utils";
import SlidingHeading from "./SlidingHeading";

const ExperinceWrapper = styled(defaultSectionStyling)`
  min-height: 100vh;
`;

function Experince() {
  return (
    <>
      <SlidingHeading word="EXPERIENCES" />
      <ExperinceWrapper />
    </>
  );
}

export default Experince;
