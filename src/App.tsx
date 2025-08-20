import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import {
  motion,
  stagger,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion"; //Variants 타입을 import
import { useEffect, useRef } from "react";

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    font-family: "Nanum Gothic Coding", monospace;
    line-height: 1;
    background:${(props) =>
      props.theme.background}; //background-color는 단색만 받음,
    color: black
    

  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }

`;

const Wrapper = styled.div`
  margin: auto 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding: 20px;
`;

const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2); // 더 자연스러운 그림자를 만들기 위한 CSS기법
`;
const GestureBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2); // 더 자연스러운 그림자를 만들기 위한 CSS기법
`;

const Cricle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  place-self: center; //
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2); // 더 자연스러운 그림자를 만들기 위한 CSS기법
`;

const boxVairant: Variants = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.7,
      delay: 0.5,
      bounce: 0.5,
      delayChildren: stagger(0.5, { startDelay: 0.7 }),
    },
  },
};

const circleVariant: Variants = {
  start: { opacity: 0, y: 10 },
  end: {
    opacity: 1,
    y: 0,
  },
};

const gestureBoxVariant: Variants = {
  hover: { scale: 1.4, rotateZ: 90 },
  click: { scale: 1, borderRadius: "50%" },
  drag: {
    backgroundColor: "rgb(253, 203, 110)",
    transition: { duration: 1 },
  },
};

const BiggerBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const MotionBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2); // 더 자연스러운 그림자를 만들기 위한 CSS기법
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const scale = useTransform(x, [-155, 0, 170], [2, 1, 0]);
  useEffect(
    () =>
      x.on("change", (latestValue) => {
        console.log("x의 최신값", x.get());
        console.log("x의 최신값(콜백인자)", latestValue);
      }),
    [x]
  );
  return (
    <Wrapper>
      <Box drag variants={boxVairant} initial="start" animate="end">
        <Cricle variants={circleVariant} />
        <Cricle variants={circleVariant} />
        <Cricle variants={circleVariant} />
        <Cricle variants={circleVariant} />
      </Box>
      <BiggerBox ref={biggerBoxRef}>
        <GestureBox
          drag
          dragConstraints={biggerBoxRef}
          dragSnapToOrigin
          variants={gestureBoxVariant}
          whileDrag="drag"
          whileHover="hover"
          whileTap="click"
        />
      </BiggerBox>
      <MotionBox style={{ x, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;
