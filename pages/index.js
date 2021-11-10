import React from "react";
import Contact from "../src/components/Contact";
import Experince from "../src/components/Experince";
import LandingComponent from "../src/components/Landing";
import Projects from "../src/components/Projects";

function IndexPage() {
  return (
    <>
      <LandingComponent />
      <Experince />
      <Projects />
      <Contact />
    </>
  );
}

export default IndexPage;
