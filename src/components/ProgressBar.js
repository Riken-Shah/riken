import React from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
  width: ${(props) => props.width}%;
  height: 4px;
  background: linear-gradient(to right, #b1c8fc, #bd4e72);
  z-index: 4;
  position: relative;
`;

const ProgressBarComponent = ({ width, ...props }) => {
  console.log(props);
  return <ProgressBar width={width} {...props} />;
};
export default ProgressBarComponent;
