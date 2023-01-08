import React, { useLayoutEffect, useMemo, useRef } from "react";
import { IconProps } from "../types";
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/src/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

interface StraightCircuitLineProps extends IconProps {
  flippedY?: boolean;
  rotate?: "L" | "R";
}

const StraightCircuitLineSvg: React.FC<StraightCircuitLineProps> = ({
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
        start: 1,
        end: 0,
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
      translateX: 4,
      translateY: -2,
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
      width="405"
      height="32"
      viewBox="0 0 405 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id={`circuit-line-path-${id}`}
        d="M395.919 16.2599L16.4167 15.921"
        stroke="white"
        strokeWidth="2"
        strokeOpacity="0"
      />
      <g filter="url(#filter0_di_829_64)">
        <path
          d="M401.692 16.2651L395.924 10.4864L390.145 16.2548L395.913 22.0334L401.692 16.2651ZM10.6432 15.9159L16.4116 21.6945L22.1902 15.9262L16.4219 10.1475L10.6432 15.9159ZM395.92 15.2599L16.4176 14.921L16.4158 16.921L395.918 17.2599L395.92 15.2599Z"
          fill="white"
        />
      </g>
      <g id={`circuit-pulse-${id}`} filter="url(#filter1_ddi_829_64)">
        <rect
          id={`pulse-rect-${id}`}
          style={{ filter: `drop-shadow(0px 0px 3px #9679ff)` }}
          x="10.0046"
          y="15.8626"
          width="7.82655"
          height="7.82655"
          transform="rotate(-44.9815 10.0046 15.8626)"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_di_829_64"
          x="5.64331"
          y="10.1476"
          width="399.049"
          height="19.8859"
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
            values="0 0 0 0 0.366667 0 0 0 0 0 0 0 0 0 0.833333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_829_64"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_829_64"
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
            values="0 0 0 0 0.26 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_829_64"
          />
        </filter>
        <filter
          id="filter1_ddi_829_64"
          x="0.00463867"
          y="0.33017"
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
            result="effect1_dropShadow_829_64"
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
            result="effect1_dropShadow_829_64"
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
            result="effect2_dropShadow_829_64"
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
            in2="effect1_dropShadow_829_64"
            result="effect2_dropShadow_829_64"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_829_64"
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
            result="effect3_innerShadow_829_64"
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
            result="effect3_innerShadow_829_64"
          />
        </filter>
      </defs>
    </svg>

    ///
  );
};

export default StraightCircuitLineSvg;
