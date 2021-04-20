import React from "react";
import styled from "styled-components";

import { AuthUserContext, withAuthorization } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
// import Toggle from "./../Toggle/Toggle";
import PasswordChangeForm from "../PasswordChange";
// import { ListOfCards } from "../ListOfCards";
import SaveTheme from "../SaveTheme";

const AccountPage = ({ theme, toggleTheme }) => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <StyledContainer>
            <h1>Account Page</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />

            {/* <ListOfCards userId={authUser.uid} /> */}
          </StyledContainer>

          <SaveTheme theme={theme} toggleTheme={toggleTheme} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);

const StyledContainer = styled.div`
  button {
    position: relative;
    display: block;
    margin: 2px;
    width: 220px;
    height: 32px;
    border-radius: 18px;
    background-color: #1c89ff;
    border: solid 1px transparent;
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover {
      background-color: #39375b;
      border-color: #fff;
      transition: all 0.1s ease-in-out;
    }
  }
`;
