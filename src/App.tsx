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
  height: 300vh;
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

const MySvg = styled.svg`
  margin-top: 40px;
  height: 200px;
  width: 200px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const svgVariants: Variants = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
  },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); //motionValue
  const y = useMotionValue(0);
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
      <ScrollBox style={{ y, scale }} />
      <MySvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <motion.path
          variants={svgVariants}
          initial={"start"}
          animate={"end"}
          transition={{
            default: { duration: 5 },
            fill: { duration: 2, delay: 3 },
          }}
          fill="transparent"
          d="M320.5 437.1C295.3 405.4 280.4 377.7 275.5 353.9C253 265.9 388.1 265.9 365.6 353.9C360.2 378.1 345.3 405.9 320.6 437.1L320.5 437.1zM458.7 510.3C416.6 528.6 375 499.4 339.4 459.8C443.3 329.7 385.5 259.8 320.6 259.8C265.7 259.8 235.4 306.3 247.3 360.3C254.2 389.5 272.5 422.7 301.7 459.8C269.2 495.8 241.2 512.5 216.5 514.7C166.5 522.1 127.4 473.6 145.2 423.6C160.3 384.4 256.9 192.4 261.1 182C276.9 151.9 286.7 124.6 320.5 124.6C352.8 124.6 363.9 150.5 380.9 184.5C416.9 255.1 470.3 362 495.7 423.6C508.9 456.7 494.3 494.9 458.7 510.2zM505.7 374.2C376.8 99.9 369.7 96 320.6 96C275.1 96 255.7 127.7 235.9 168.8C129.7 381.1 119.5 411.2 118.6 413.8C93.4 483.1 145.3 544 208.2 544C229.9 544 268.8 537.9 320.6 481.6C379.3 545.4 421.9 544 433 544C495.9 544.1 547.9 483.1 522.6 413.8C522.6 409.9 505.8 374.9 505.8 374.2L505.8 374.2z"
        ></motion.path>
      </MySvg>
    </Wrapper>
  );
}

export default App;
