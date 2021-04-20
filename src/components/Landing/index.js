import React from "react";
import { AuthUserContext } from "../Session";

const Landing = () => (
  <AuthUserContext>
    {(authUser) => (
      <div>
        <h1>Landing</h1>
      </div>
    )}
  </AuthUserContext>
);

export default Landing;
