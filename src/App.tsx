import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { motion, AnimatePresence, type Variants, number } from "framer-motion"; //Variants 타입을 import
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
  align-items: center;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 80vw;
  gap: 15px;
  div:nth-child(5n + 1) {
    grid-column: span 2;
  }
  padding: 30px 10px;
  grid-auto-flow: dense;
`;

const flags = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Costa_Rica_%28state%29.svg/2560px-Flag_of_Costa_Rica_%28state%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_the_Cocos_%28Keeling%29_Islands.svg/2560px-Flag_of_the_Cocos_%28Keeling%29_Islands.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flag_of_Belize.svg/960px-Flag_of_Belize.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Turkmenistan.svg/2560px-Flag_of_Turkmenistan.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Flag_of_Lesotho.svg/2560px-Flag_of_Lesotho.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_the_Cook_Islands.svg/2560px-Flag_of_the_Cook_Islands.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_the_Solomon_Islands.svg/1280px-Flag_of_the_Solomon_Islands.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/2560px-Flag_of_Canada.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/2560px-Flag_of_Kenya.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_Eswatini.svg/2560px-Flag_of_Eswatini.svg.png",
];

const LayoutBox = styled(motion.div)<ILayoutBoxProp>`
  // interface 전달
  height: 100px;
  background-image: url(${(prop) => prop.bg}); // url이미지로 지정, prop
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ILayoutBoxProp {
  // bg Prop의 타입을 정의
  bg: string;
}

function App() {
  const [id, setId] = useState<null | number>(null); // index는 number, useState의 기본은 null
  console.log(id);
  return (
    <Wrapper>
      <GridBox>
        {flags.map(
          (
            flag,
            index //map flag, index추가
          ) => (
            <LayoutBox
              onClick={() => setId(index)} //index로 update
              key={index}
              bg={flag} //index를 이용해 flags 배열에 접근
              layoutId={String(index)} //layoutId는 string을 받으므로 String으로 변경
            />
          )
        )}
      </GridBox>
      <AnimatePresence>
        {id !== null ? ( //index는 0부터시작, falsy가되어 렌더링이 되지 않을 수 있기때문에,, 모든경우에 ture를 반환하게 조정
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <LayoutBox
              layoutId={String(id)}
              bg={flags[id]} // id는 string, index는 number -> Number로 id 변환한 뒤, -1을 해 올바른 인덱스를 얻음
              style={{ width: 750, height: 400 }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
