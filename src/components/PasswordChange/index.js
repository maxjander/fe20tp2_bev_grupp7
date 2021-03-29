import React, { useState } from "react";
import styled from "styled-components";

import { withFirebase } from "../Firebase";

const PasswordChangeForm = (props) => {
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  const onSubmit = (event) => {
    props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne("");
        setPasswordTwo("");
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });

    event.preventDefault();
  };
  const onChangeOne = (event) => {
    setPasswordOne(event.target.value);
  };

  const onChangeTwo = (event) => {
    setPasswordTwo(event.target.value);
  };

  return (
    <FlexForm onSubmit={onSubmit}>
      <StyledInput
        name='passwordOne'
        value={passwordOne}
        onChange={onChangeOne}
        type='password'
        placeholder='New Password'
      />
      <StyledInput
        name='passwordTwo'
        value={passwordTwo}
        onChange={onChangeTwo}
        type='password'
        placeholder='Confirm New Password'
      />
      <button disabled={isInvalid} type='submit'>
        Reset My Password
      </button>

      {error && <p> {error.message}</p>}
    </FlexForm>
  );
};
export default withFirebase(PasswordChangeForm);

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;
`;
