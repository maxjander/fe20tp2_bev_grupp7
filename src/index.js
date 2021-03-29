import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";

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
