import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { AuthUserContext } from '../Session';
import { breakpoints } from '../../constants/breakpoints.js';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

// authUser.roles[ROLES.ADMIN]
const NavigationAuth = ({ authUser }) => (
  <NavContainer>
    <NavUl>
      <li>TCG Empire</li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
      <Link to={ROUTES.GRAPH}>Graph</Link>
      </li>
      {!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}

      <SignOutButton />
    </NavUl>
  </NavContainer>
);
const NavigationNonAuth = () => (
  <NavContainer>
    <NavUl>
      <li>TCG Empire</li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>{' '}
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </NavUl>
  </NavContainer>
);

export default Navigation;

const NavContainer = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  /* ${breakpoints('background-color', '', [
    { 1200: 'palevioletred' },
    { 800: 'blue' },
    { 600: 'yellow' },
    { 450: 'red' },
  ])} */
`;

const NavUl = styled.ul`
  background-color: #C0B9DD;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60px;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 609px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    @media (min-width: 1025px) {
      justify-content: space-around;
    }
  }

  li {
    padding: 10px 10px 10px 10px;
    margin-right: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    text-transform: uppercase;
    text-align: center;
    display: flex;
    justify-content: center;
    font-weight: bold;
    width: 100px;
    transition: ease-in 0.2s;

    &:hover {
      background-color: white; 
    }
    &:first-child {
      align-self: left;
      margin-right: auto;
      margin-left: 10px;
      &:hover {
        background-color: white;
      }
    }

    a {
      color: black;
      text-transform: uppercase;
      text-decoration: none;
    }
  }
`;


/*
"

ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }





  .logo {
      margin: 0;
      font-size: 1.45em;
  }

  .main-nav {
      margin-top: 5px;

  }
  .logo a,
  .main-nav a {
      padding: 10px 15px;
      text-transform: uppercase;
      text-align: center;
      display: block;
  }

  .main-nav a {
      color: #34495e;
      font-size: .99em;
  }

  .main-nav a:hover {
      color: #718daa;
  }



  .header {
      padding-top: .5em;
      padding-bottom: .5em;
      border: 1px solid #a2a2a2;
      background-color: #f4f4f4;
      -webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
      box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
  }


  /* =================================
    Media Queries
  ==================================== */

/* @media (minWidth: 769px) {
      .header,
      .main-nav {
          display: flex;
      }
      .header {
          flex-direction: column;
          align-items: center;
          .header{
          width: 80%;
          margin: 0 auto;
          max-width: 1150px;
      }
      }

  }

  @media (minWidth: 1025px) {
      .header {
          flex-direction: row;
          justify-content: space-between;
      }

  }

" */
