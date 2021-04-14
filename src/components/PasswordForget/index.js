import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const PasswordForgetFormBase = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const isInvalid = email === "";

  const onSubmit = (event) => {
    props.firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
      })
      .catch((error) => {
        setError(error);
      });

    event.preventDefault();
  };
  const onChange = (event) => setEmail(event.target.value);

  return (
    <FlexForm onSubmit={onSubmit}>
      <StyledInput
        name='email'
        value={email}
        onChange={onChange}
        type='text'
        placeholder='Email Address'
      />
      <button disabled={isInvalid} type='submit'>
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </FlexForm>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid; 
  border-color: rgba(0,0,0,0.3);
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;
`;
