import styled from "styled-components";

export const BubbleTextContainer = styled.div<{
  neon?: boolean;
  letterSpacing?: number;
}>`
  font-family: "Roboto", sans-serif;
  font-size: 48px;
  cursor: pointer;
  font-weight: 100;
  color: #9679ff;
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing ? `${letterSpacing}px` : "2px"};
  > span {
    transition: all;
    transition-duration: 0.35s;
  }

  .bubble-text-hovered-char {
    color: #fbfbfb;
    font-weight: ${({ neon }) => (neon ? `700` : "900")};
    text-shadow: ${({ neon }) =>
      neon
        ? `0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px #8913fe,
     0 0 35px #8913fe, 0 0 50px #8913fe, 0 0 65px #8913fe`
        : "unset"};
  }

  .bubble-text-hovered-adjacent {
    color: #d2c5ff;
    font-weight: ${({ neon }) => (neon ? `400` : "500")};
    text-shadow: ${({ neon }) =>
      neon
        ? `0 0 2px #fff, 0 0 4px #fff, 0 0 5px #fff, 0 0 8px #8913fe,
      0 0 15px #8913fe, 0 0 25px #8913fe`
        : "unset"};
  }

  .bubble-text-hovered-next-adjacent {
    color: #b9a5ff;
    font-weight: ${({ neon }) => (neon ? `200` : "200")};
    text-shadow: ${({ neon }) =>
      neon
        ? `0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 5px #8913fe,
    0 0 10px #8913fe, 0 0 20px #8913fe`
        : "unset"};
  }
`;
