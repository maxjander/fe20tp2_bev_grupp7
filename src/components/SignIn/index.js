import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styled from 'styled-components';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <StyledContainer>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </StyledContainer>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
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

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
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
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };


const StyledContainer = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center;

  button{
  position: relative;
  display: block;
  margin: 2px;
  width: 120px;
  height: 26px;
  border-radius: 18px;
  background-color: #1c89ff;
  border: solid 1px transparent;
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  transition: all .1s ease-in-out;
    &:hover {
      background-color: #39375B;
      border-color: #fff;
      transition: all .1s ease-in-out;
    }
  }
`

const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid; 
  border-color: rgba(0,0,0,0.3);
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;
`;