import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import {
  motion,
  stagger,
  useMotionValue,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion"; //Variants 타입을 import
import { useRef } from "react";

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
    background-color:white;
   /*  background:${(props) =>
     props.theme.background}; //background-color는 단색만 받음, */
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

const Wrapper = styled(motion.div)`
  // MotionBox의 모션 연동을 위해, motion.div로 변경
  margin: auto 0;
  height: 200vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 150px;
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
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2); // 더 자연스러운 그림자를 만들기 위한 CSS기법
`;

const ScrollBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2); // 더 자연스러운 그림자를 만들기 위한 CSS기법
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); //motionValue
  const rotateZ = useTransform(x, [-155, 0, 170], [-360, 0, 360]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const gradient = useTransform(
    x,
    [-155, 0, 170],
    [
      "linear-graident(-135deg, rgb(34, 227, 9),rgb(178, 184, 0)",
      "linear-gradient(0deg,rgb(9, 132, 227),rgb(0, 184, 148)",
      "linear-gradient(135deg,rgb(227, 9, 24),rgb(0, 184, 148)",
    ]
  );
  return (
    <Wrapper style={{ background: gradient }}>
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
      <MotionBox style={{ x, rotateZ }} drag="x" dragSnapToOrigin />
      <ScrollBox style={{ x, scale }} />
    </Wrapper>
  );
}

export default App;
