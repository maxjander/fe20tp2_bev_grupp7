import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";
/*

  Imported createGlobalStyle
  and inserted the styles from index.css

  this to apply global styles over the whole app

*/
export const GlobalStyle = createGlobalStyle`
  ${normalize}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

ul {
  margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
}

ul, li {
  margin: 0 !important;
}

*:focus {
    outline: none;
}
`;

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <GlobalStyle />
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
