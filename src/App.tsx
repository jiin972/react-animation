import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { motion, AnimatePresence, type Variants } from "framer-motion"; //Variants 타입을 import
import { useState } from "react";

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
    background:linear-gradient(135deg, rgb(9, 132, 227), rgb(0, 184, 148));
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
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 150px;
  height: 150px;
  top: 120px;
  background-color: black;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  color: white;
  font-size: 28px;
`;

const boxNextVariants: Variants = {
  entry: (isBack: boolean) => {
    //isBack이 falsy일때, 500(화면의 오른쪽에서 나타남),즉 next 구현
    return {
      x: isBack ? -500 : 500,
      scale: 0,
      opacity: 0,
    };
  },
  center: { x: 0, scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: (isBack: boolean) => {
    return {
      x: isBack ? 500 : -500, // isBack이 true일때, 500(화면 오른쪽으로 사라짐), prev 구현
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    };
  },
};

const Circle = styled(motion.div)`
  background-color: rgb(9, 132, 227);
  width: 75px;
  height: 75px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const CircleA = styled(motion.div)`
  background-color: rgb(9, 132, 227);
  width: 75px;
  height: 75px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxA = styled(motion.div)`
  margin-top: 350px;
  display: flex;
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  font-size: 28px;
`;
const BoxB = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  color: white;
  font-size: 28px;
`;

const WrapperBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: 100%;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 80vw;
  gap: 15px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const LayoutBox = styled(motion.div)`
  height: 100px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  font-size: 28px;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const toggleIsClicked = () => setIsClicked((prev) => !prev);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    // 무한 루프를 막기 위해 함수로 생성
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    setBack(false);
  };
  const prevPlease = () => {
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    setBack(true);
  };
  return (
    <>
      <Wrapper>
        <AnimatePresence mode="sync" custom={back}>
          <Box
            custom={back}
            variants={boxNextVariants}
            initial="entry"
            animate="center"
            exit={"exit"}
            key={visible}
          >
            {visible}
          </Box>
        </AnimatePresence>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
          }}
        >
          <button onClick={prevPlease}>prev</button>
          <button onClick={nextPlease}>next</button>
        </div>
        <div className="layout" onClick={toggleClicked}>
          <BoxA
            style={{
              justifyContent: clicked ? "center" : "flex-start",
              alignItems: clicked ? "center" : "flex-start",
            }}
          >
            <Circle layout transition={{ duration: 0.3 }} />
          </BoxA>
        </div>
        <div
          style={{ display: "flex", gap: 15 }}
          className="shared-layout"
          onClick={toggleIsClicked}
        >
          <BoxB>
            {!isClicked ? (
              <CircleA layoutId="circle" style={{ borderRadius: "50%" }} /> // isClicked가 false일때, 초기값이 false이므로, 결과적으로 true가 되어 첫 컴포넌트 랜더링
            ) : null}
          </BoxB>
          <BoxB>
            {isClicked ? (
              <CircleA
                layoutId="circle"
                style={{ borderRadius: 0, scale: 2 }}
              />
            ) : null}
          </BoxB>
        </div>
      </Wrapper>
      <WrapperBox>
        <GridBox>
          <LayoutBox />
          <LayoutBox />
          <LayoutBox />
          <LayoutBox />
        </GridBox>
        <Overlay></Overlay>
      </WrapperBox>
    </>
  );
}

export default App;
