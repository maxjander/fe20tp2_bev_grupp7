import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import styled from "styled-components";
import { FcViewDetails, FcStatistics, FcCheckmark } from "react-icons/fc";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <>
    <StyledSignInWrapper>
      <StyledWelcomeContainer>
        <StyledH1>
          The leading platform for tracking your TCG investments
        </StyledH1>
        <StyledIconWrapper>
          <StyledIcon>
            <StyledFcViewDetails />
            <h3>Detailed info</h3>
          </StyledIcon>
          <StyledIcon>
            <StyledFcStatistics />
            <h3>Become a better investor</h3>
          </StyledIcon>
          <StyledIcon>
            <StyledCheckmark />
            <h3>Easy to use</h3>
          </StyledIcon>
        </StyledIconWrapper>
      </StyledWelcomeContainer>
      <StyledContainer>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </StyledContainer>
    </StyledSignInWrapper>
  </>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <StyledForm onSubmit={this.onSubmit}>
        <StyledInput
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <StyledInput
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <StyledButton disabled={isInvalid} type="submit">
          Sign In
        </StyledButton>

        {error && <p>{error.message}</p>}
      </StyledForm>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };

const StyledSignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  /* background: black; */
`;

const StyledButton = styled.button`
  display: block;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: #1c89ff;
  border: solid 1px transparent;
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  justify-content: center;
`;

const StyledCheckmark = styled(FcCheckmark)`
  font-size: 100px;
  align-self: center;
`;
const StyledFcViewDetails = styled(FcViewDetails)`
  font-size: 100px;
  align-self: center;
`;
const StyledFcStatistics = styled(FcStatistics)`
  font-size: 100px;
  align-self: center;
`;

const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-top: 100px;
  @media (max-width: 600px) {
    padding-top: 10px;
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledH1 = styled.h1`
  font-family: "Play", sans-serif;
`;

const StyledWelcomeContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  padding-top: 20px;
`;

// const StyledButton = styled.button`
//   position: relative;
//   display: block;
//   margin: 2px;
//   width: 120px;
//   height: 26px;
//   border-radius: 18px;
//   background-color: #1c89ff;
//   border: solid 1px transparent;
//   color: #fff;
//   font-size: 18px;
//   font-weight: 300;
//   cursor: pointer;
//   transition: all 0.1s ease-in-out;
//   &:hover {
//     background-color: #39375b;
//     border-color: #fff;
//     transition: all 0.1s ease-in-out;
//   }
// `;

const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;
`;
