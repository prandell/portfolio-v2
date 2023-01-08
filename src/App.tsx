import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import "./App.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingPage from "./pages/landing-page/landing-page.component";
import ScrollStraightCircuitLine from "./components/svg-components/circuit-lines/scroll-straight-circuit-line";
gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Projects",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, ea.",
  },
  {
    title: "Exeperience",
    subtitle:
      "Dignissimos placeat cupiditate perferendis eaque praesentium similique officia dolore?",
  },
  {
    title: "About",
    subtitle:
      "In ullam et nulla repudiandae praesentium, laboriosam quas tempore fuga asperiores eveniet amet.",
  },
];

const App: React.FC = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);
  revealRefs.current = [];

  // useLayoutEffect(() => {
  //   gsap.to(headerRef.current, {
  //     backgroundColor: background,
  //     duration: 1,
  //     ease: "none",
  //   });
  // }, [background]);

  useLayoutEffect(() => {
    // gsap.from(headerRef.current, {
    //   autoAlpha: 0,
    //   ease: "none",
    //   delay: 1,
    // });

    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el: any) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="App">
      <ScrollStraightCircuitLine
        style={{ position: "absolute", left: "-150px", bottom: "150px" }}
        id="scroll-test"
      />
      <LandingPage />
      <main className="app-main">
        {sections.map(({ title, subtitle }) => (
          <div className="app-section" key={title} ref={addToRefs}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
