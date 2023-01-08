import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import * as Styled from "./bubble-text.styles";
import { gsap } from "gsap";

interface BubbleTextProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  neon?: boolean;
  letterSpacing?: number;
}

const BubbleText: FC<BubbleTextProps> = ({
  text,
  neon,
  letterSpacing,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {}, headerRef); // <- Scope!

  //   return () => ctx.revert();
  // }, []);

  const removeClasses = useCallback(() => {
    if (charRefs.current.length) {
      charRefs.current.forEach((char: HTMLSpanElement) => {
        char.classList.remove("bubble-text-hovered-char");
        char.classList.remove("bubble-text-hovered-adjacent");
        char.classList.remove("bubble-text-hovered-next-adjacent");
      });
    }
  }, [charRefs]);

  const charMouseOver = useCallback(
    (e: MouseEvent) => {
      removeClasses();
      const curEl = e.target as HTMLSpanElement;
      const index = parseInt(curEl.getAttribute("data-index") ?? "0");

      const prevPrevIndex = index <= 1 ? null : index - 2;
      const prevIndex = index === 0 ? null : index - 1;
      const nextIndex = index === text.length - 1 ? null : index + 1;
      const nextNextIndex = index >= text.length - 2 ? null : index + 2;

      const prevPrevEl =
        prevPrevIndex !== null &&
        document.querySelector(`[data-index="${prevPrevIndex}"]`);
      const prevEl =
        prevIndex !== null &&
        document.querySelector(`[data-index="${prevIndex}"]`);
      const nextEl =
        nextIndex !== null &&
        document.querySelector(`[data-index="${nextIndex}"]`);
      const nextNextEl =
        nextNextIndex !== null &&
        document.querySelector(`[data-index="${nextNextIndex}"]`);

      curEl.classList.add("bubble-text-hovered-char");
      prevPrevEl &&
        prevPrevEl.classList.add("bubble-text-hovered-next-adjacent");
      prevEl && prevEl.classList.add("bubble-text-hovered-adjacent");
      nextEl && nextEl.classList.add("bubble-text-hovered-adjacent");
      nextNextEl &&
        nextNextEl.classList.add("bubble-text-hovered-next-adjacent");
    },
    [text, removeClasses]
  );

  useEffect(() => {
    if (charRefs.current.length) {
      charRefs.current.forEach((char: HTMLSpanElement) => {
        char.removeEventListener("mouseover", charMouseOver);
        char.addEventListener("mouseover", charMouseOver);
      });
    }
  }, [charRefs, charMouseOver]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("mouseleave", () => {
        removeClasses();
      });
    }
  }, [containerRef, removeClasses]);

  const splitText = useMemo(() => text.split(""), [text]);

  const addToRefs = (el: HTMLSpanElement) => {
    if (el && !charRefs.current.includes(el)) {
      charRefs.current.push(el);
    }
  };

  return (
    <Styled.BubbleTextContainer
      neon={neon}
      letterSpacing={letterSpacing}
      ref={containerRef}
      {...props}
    >
      {splitText.map((char, idx) => {
        return (
          <span
            data-index={idx}
            key={`${char}-${idx}`}
            ref={addToRefs}
            className="bubble-text-char"
          >
            {char}
          </span>
        );
      })}
    </Styled.BubbleTextContainer>
  );
};

export default BubbleText;
