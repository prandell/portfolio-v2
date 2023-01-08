import React, { FC, useLayoutEffect, useRef } from "react";
import * as Styled from "./landing-page.styles";
import { gsap } from "gsap";
import BubbleText from "../../components/bubble-text/bubble-text.component";
import CircuitLineSvg from "../../components/svg-components/circuit-lines/circuit-line";
import StraightCircuitLineSvg from "../../components/svg-components/circuit-lines/straight-circuit-line";
import ScrollStraightCircuitLine from "../../components/svg-components/circuit-lines/scroll-straight-circuit-line";

const LandingPage: FC = () => {
  const headerRef = useRef<HTMLHeadElement | null>(null);

  return (
    <Styled.LandingPageContainer>
      <CircuitLineSvg
        id={"top-left"}
        className="circuit-line"
        style={{ position: "absolute", left: "50px", top: "-50px" }}
      />
      <CircuitLineSvg
        id={"bottom-middle"}
        className="circuit-line"
        flippedY
        style={{
          position: "absolute",
          left: "45%",
          right: "0",
          bottom: "-100px",
        }}
      />
      <CircuitLineSvg
        id={"left-middle"}
        className="circuit-line"
        flippedY
        rotate="R"
        style={{
          position: "absolute",
          right: "0px",
          bottom: "30%",
        }}
      />
      {/* <StraightCircuitLineSvg
        id="straigt-left"
        className="circuit-line"
        style={{ position: "absolute", left: "-150px", bottom: "150px" }}
      /> */}
      <StraightCircuitLineSvg
        id="straigt-top-right"
        className="circuit-line"
        rotate="R"
        style={{ position: "absolute", right: "100px", top: "-50px" }}
      />
      <Styled.LandingTitle text="Pat Randell" neon letterSpacing={4} />
    </Styled.LandingPageContainer>
  );
};

export default LandingPage;
