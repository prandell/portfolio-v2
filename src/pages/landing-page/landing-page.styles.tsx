import styled from "styled-components";
import BubbleText from "../../components/bubble-text/bubble-text.component";

export const LandingPageContainer = styled.div`
  background-color: #0a0011;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  position: relative;
  overflow: hidden;
`;

export const LandingTitle = styled(BubbleText)`
  position: fixed;
  top: 50vh;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
