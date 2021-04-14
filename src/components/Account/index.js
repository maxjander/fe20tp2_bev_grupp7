import React from "react";

import { AuthUserContext, withAuthorization } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { ListOfCards } from "../ListOfCards";
import ThemeABC from "../TESTFORTHEME";

const AccountPage = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <h1>Account Page</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />

          <ListOfCards userId={authUser.uid} />
          <ThemeABC/>
        </div>
      )}

    </AuthUserContext.Consumer>
    
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
