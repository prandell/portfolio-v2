import React, { useLayoutEffect, useMemo, useRef } from "react";
import { IconProps } from "../types";
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/src/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

interface CircuitLineProps extends IconProps {
  flippedY?: boolean;
  rotate?: "L" | "R";
}

const CircuitLineSvg: React.FC<CircuitLineProps> = ({
  id,
  flippedY,
  rotate,
  fill,
  ...props
}) => {
  const circuitLineRef = useRef<SVGSVGElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, circuitLineRef); // <- Scope!
    gsap.set(`#circuit-pulse-${id}`, { xPercent: -50, yPercent: -50 });

    const tl = gsap.timeline({
      delay: 1,
      repeat: -1,
      repeatDelay: 3,
    });

    tl.to(`#circuit-pulse-${id}`, {
      duration: 1.5,
      motionPath: {
        path: `#circuit-line-path-${id}`,
        align: `#circuit-line-path-${id}`,
        alignOrigin: [0.5, 0.5],
      },
      ease: "none",
    });

    tl.to(
      `#pulse-rect-${id}`,
      {
        duration: 1.5,
        filter: `drop-shadow(0px 0px 1px #9679ff)`,
        ease: "slow",
      },
      "<"
    );

    tl.to(`#pulse-rect-${id}`, {
      duration: 0.5,
      translateX: -2.5,
      translateY: 4,
      scaleX: 0,
      scaleY: 0,
    });

    return () => ctx.revert();
  }, []);

  const flippedTransform = useMemo(() => {
    if (!rotate && !flippedY) return undefined;
    let transform: string[] = [];
    if (flippedY) transform.push("scaleY(-1)");
    if (rotate && rotate === "R") transform.push("rotate(90deg)");
    if (rotate && rotate === "L") transform.push("rotate(-90deg)");
    return transform.join(" ");
  }, [flippedY, rotate]);

  return (
    <svg
      {...props}
      style={{ ...props.style, transform: flippedTransform }}
      ref={circuitLineRef}
      width="113"
      height="321"
      viewBox="0 0 113 321"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_di_827_63)">
        <path
          d="M16 10.2265L10.2265 16L16 21.7735L21.7735 16L16 10.2265ZM16 208H15V209H16V208ZM103.5 208H104.5V207H103.5V208ZM103.5 312.774L109.274 307L103.5 301.226L97.7265 307L103.5 312.774ZM15 16V208H17V16H15ZM16 209H103.5V207H16V209ZM102.5 208V307H104.5V208H102.5Z"
          fill="white"
        />
      </g>
      <path
        id={`circuit-line-path-${id}`}
        d="M16 16V207.5H104.5V307"
        stroke="white"
        strokeOpacity="0"
      />
      <g id={`circuit-pulse-${id}`} filter="url(#filter1_ddi_827_63)">
        <rect
          id={`pulse-rect-${id}`}
          style={{ filter: `drop-shadow(0px 0px 3px #9679ff)` }}
          x="15.5408"
          y="10"
          width="7.82654"
          height="7.82654"
          transform="rotate(45.0682 15.5408 10)"
          fill="white"
        />
      </g>
      <defs>
        <filter
          x="5.22656"
          y="10.2264"
          width="107.047"
          height="310.547"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            id="pulse-drop-shadow"
            dx="0"
            dy="0"
            stdDeviation="0.5"
            floodColor="#9679ff"
          />
        </filter>
        <filter
          id="filter0_di_827_63"
          x="5.22656"
          y="10.2264"
          width="107.047"
          height="310.547"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.368627 0 0 0 0 0 0 0 0 0 0.831373 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_827_63"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_827_63"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.258824 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_827_63"
          />
        </filter>
        <filter
          id="filter1_ddi_827_63"
          x="0"
          y="0"
          width="31.0684"
          height="31.0684"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_827_63"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.56975 0 0 0 0 0.313542 0 0 0 0 0.895833 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_827_63"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect2_dropShadow_827_63"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.39485 0 0 0 0 0.0110416 0 0 0 0 0.883333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_827_63"
            result="effect2_dropShadow_827_63"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_827_63"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect3_innerShadow_827_63"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.368917 0 0 0 0 0 0 0 0 0 0.970833 0 0 0 0.75 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect3_innerShadow_827_63"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CircuitLineSvg;
