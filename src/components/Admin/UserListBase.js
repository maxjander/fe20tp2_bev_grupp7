import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const UserListBase = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setLoading(true);

    props.firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      setUsers(usersList);
      setLoading(false);
      return () => {
        props.firebase.users().off();
      };
    });
  }, [props.firebase]);

  return (
    <div>
      <h2>Users</h2>
      {loading && <div>Loading ...</div>}
      <StyledUl>
        {users.map((user) => (
          <StyledLi key={user.uid}>
            <ul>
              <li>
                <strong>ID:</strong> {user.uid}
              </li>
              <li>
                <strong>E-Mail:</strong> {user.email}
              </li>
              <li>
                <strong>Username:</strong> {user.username}
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                    state: { user },
                  }}>
                  Details
                </Link>
              </li>
            </ul>
          </StyledLi>
        ))}
      </StyledUl>
    </div>
  );
};

export default UserListBase;

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
