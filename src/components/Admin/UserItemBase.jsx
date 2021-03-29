import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ListOfCards } from "../ListOfCards";
const UserItemBase = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  // const [location, setLocation] = useState(props.location.state)
  const onSendPasswordResetEmail = () => {
    props.firebase.doPasswordReset(user.email);
  };

  useEffect(() => {
    if (user) {
      return;
    }
    setLoading(true);

    props.firebase.user(props.match.params.id).on("value", (snapshot) => {
      setUser(snapshot.val());
      setLoading(false);

      return () => {
        props.firebase.user(props.match.params.id).off();
      };
    });
  }, [user, props.firebase, props.match.params.id]);

  console.log(user);

  return (
    <div>
      <h2>User ({props.match.params.id})</h2>
      {loading && <div>Loading ...</div>}

      {user && (
        <StyledUl>
          <StyledLi>
            <strong>ID:</strong> {props.match.params.id}
          </StyledLi>
          <StyledLi>
            <strong>E-Mail:</strong> {user.email}
          </StyledLi>
          <StyledLi>
            <strong>Username:</strong> {user.username}
          </StyledLi>
          <StyledLi>
            <button type='button' onClick={onSendPasswordResetEmail}>
              Send Password Reset
            </button>
          </StyledLi>
        </StyledUl>
      )}
      <span>All of Users Cards</span>
      <hr />
      <ListOfCards userId={props.match.params.id} />
    </div>
  );
};

export default UserItemBase;

const StyledLi = styled.li`
  list-style: none;
  li {
    list-style: none;
  }
`;
const StyledUl = styled.ul`
  padding-left: 0;

  ul {
    padding-left: 0;
    padding-bottom: 10px;
  }
`;
