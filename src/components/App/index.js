import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import { useDarkMode } from "./../../hooks/useDarkMode";
import { lightTheme, darkTheme } from "./../../constants/theme";

import Navigation from "../Navigation";
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
      <Wrapper>
        <Router>
          <Navigation />

          <FlexContainer>
            {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />

            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route
              path={ROUTES.ACCOUNT}
              render={(props) => (
                <AccountPage theme={theme} toggleTheme={toggleTheme} />
              )}
            />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            {/* <Route path={ROUTES.GRAPH} component={Graph} /> */}
            {/* {theme && <Toggle theme={theme} toggleTheme={toggleTheme} />} */}
          </FlexContainer>
        </Router>
      </Wrapper>
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
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.body};
`;
