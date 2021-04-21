import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { FaTimes, FaBars } from "react-icons/fa";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import v2_pink from "./../../icons/v2_pink.png";
import { AuthUserContext } from "../Session";

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
const NavigationAuth = ({ authUser }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <NavContainer>
      <HumIcon className='XD' onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </HumIcon>
      <NavUl className='NavUl' click={click}>
        <li className='logo'>
          <StyledImage src={v2_pink} />
        </li>
        {/* <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li> */}
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
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
};
const NavigationNonAuth = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <NavContainer>
      <HumIcon className='XD' onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </HumIcon>
      <NavUl className='NavUl' click={click}>
        <li className='logo'>TCG Empire</li>

        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </NavUl>
    </NavContainer>
  );
};

export default Navigation;

const NavContainer = styled.div`
  display: flex;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 00px;
`;

const NavUl = styled.ul`
  background-color: #c0b9dd;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  text-transform: uppercase;
  align-items: center;
  margin: 0;
  padding: 10px;
  list-style: none;
  width: 100%;
  :nth-child(0) {
    transform: translate(-1000px);
  }
  .logo {
    justify-content: flex-start;
    display: inline-block;
    margin-right: auto;
    &:hover {
      background-color: transparent;
      cursor: default;
    }
  }
  @media only screen and (max-width: 609px) {
    display: ${({ click }) => (click ? "flex" : "none")};
    flex-direction: column;
    justify-content: space-between;
    .logo {
      display: none;
      margin-right: auto;
      flex-grow: 1;
    }
  }

  li {
    padding: 10px 10px 10px 10px;
    margin: 10px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    justify-content: center;
    font-weight: bold;
    width: 100px;
    transition: ease-in 0.2s;
    &:hover {
      background-color: white;
      background-size: 10px 10px;
      cursor: pointer;
    }
  }

  a {
    color: black;
    text-decoration: none;
  }
`;

const HumIcon = styled.div`
  display: none;
  @media only screen and (max-width: 609px) {
    display: flex;
    position: absolute;
    color: #808080;
    left: 51%;
    top: -1%;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  width: 140px;
  @media (max-width: 609px) {
    display: none;
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
