import React from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
  width: ${(props) => props.width}%;
  height: 4px;
  background: linear-gradient(to right, #b1c8fc, #bd4e72);
`;

const ProgressBarComponent = ({ width }) => (
  <>
    <ProgressBar width={width} />
  </>
);
export default ProgressBarComponent;
