import styled from "styled-components";

import { breakpoints } from "./breakpoints";

export const Wrapper = styled.div`
padding: 100px;
${breakpoints("padding", "px", [
    { 1200: 80 },
    { 800: 60 },
    { 600: 40 },
    { 450: 20 }
])};
/* @media screen and (max-width: 1200px) {
  padding: 80px;
}
@media screen and (max-width: 800px) {
  padding: 60px;
}
@media screen and (max-width: 600px) {
  padding: 40px;
}
@media screen and (max-width: 450px) {
  padding: 20px;
} */
`;

export const StyledH1 = styled.h1`
font-size: 5rem;
${breakpoints("font-size", "rem", [
    { 1200: 4 },
    { 800: 3 },
    { 600: 2.4 },
    { 450: 1.6 }
])};
/* @media screen and (max-width: 1200px) {
  font-size: 4rem;
}
@media screen and (max-width: 800px) {
  font-size: 3rem;
}
@media screen and (max-width: 600px) {
  font-size: 2.4rem;
}
@media screen and (max-width: 450px) {
  font-size: 1.6rem;
} */
`;


export const StyledH2 = styled.h2`
font-size: 4rem;
${breakpoints("font-size", "rem", [
    { 1200: 3 },
    { 800: 2 },
    { 600: 1.6 },
    { 450: 1.3 }
])};
/* @media screen and (max-width: 1200px) {
  font-size: 4rem;
}
@media screen and (max-width: 800px) {
  font-size: 3rem;
}
@media screen and (max-width: 600px) {
  font-size: 2.4rem;
}
@media screen and (max-width: 450px) {
  font-size: 1.6rem;
} */
`;


export const StyledH3 = styled.h3`
font-size: 3rem;
${breakpoints("font-size", "rem", [
  { 1200: 2 },
  { 800: 1.8 },
  { 600: 1.4 },
  { 450: 1.3 }
])};
/* @media screen and (max-width: 1200px) {
  font-size: 3rem;
}
@media screen and (max-width: 800px) {
  font-size: 3rem;
}
@media screen and (max-width: 600px) {
  font-size: 2.4rem;
}
@media screen and (max-width: 450px) {
  font-size: 1.6rem;
} */
`;

export const Content = styled.section`
font-size: 3rem;
margin: 60px 0;
padding: 60px;
${breakpoints("font-size", "rem", [
    { 1200: 2.4 },
    { 800: 1.8 },
    { 600: 1.6 },
    { 450: 1.2 }
])};
${breakpoints("margin", "", [
    { 1200: "40px 0" },
    { 600: "20px 0" }
])};

/* @media screen and (max-width: 1200px) {
  font-size: 2.4rem;
  margin: 40px 0;
}
@media screen and (max-width: 800px) {
  font-size: 1.8rem;
}
@media screen and (max-width: 600px) {
  font-size: 1.6rem;
  margin: 20px 0;
}
@media screen and (max-width: 450px) {
  font-size: 1.2rem;
} */

${breakpoints("padding", "px", [
    { 1200: "40" }, 
    { 600: "20" }
    ])};
    /* @media screen and (max-width: 1200px) {

  padding: 40px;
}
@media screen and (max-width: 600px) {

  padding: 20px;
}
 */

`;