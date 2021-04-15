import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import { useDarkMode } from "./../../hooks/useDarkMode";
import { lightTheme, darkTheme } from "./../../constants/theme";
import Toggle from "./../Toggle/Toggle";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import Graph from "../Graph";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => {


  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!componentMounted) {
    return <div />;
  }


  return (
    <ThemeProvider theme={themeMode}>
      <Router>
        <div>
          <Navigation />

          <hr />
          <FlexContainer>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.GRAPH} component={Graph} />
          </FlexContainer>
        </div>
      </Router>

    { theme &&  <Toggle theme={theme} toggleTheme={toggleTheme} /> }
    </ThemeProvider>
  );
};

export default withAuthentication(App);
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;
