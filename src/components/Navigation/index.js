import React, { useState } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaTimes, FaBars } from 'react-icons/fa'

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import { AuthUserContext } from "../Session";
import { breakpoints } from "../../constants/breakpoints.js";


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
    <Navbar />
  </div>
);
const Navbar = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)

  return (
    <>
      <HumIcon onClick={handleClick} >
        {click ? <FaTimes /> : <FaBars />}
      </HumIcon>
      <NavUl onClick={handleClick} click={click}></NavUl>
      
    </>
  )
} 

const NavigationAuth = ({ authUser }) => (
  <NavContainer>
    <NavUl> 
      <NavLogo>
      <li className="logo">TCG Empire</li>
      </NavLogo>
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



const NavigationNonAuth = () => (
  <NavContainer>
    <NavUl>
    <NavLogo>
      <li className="logo">TCG Empire</li>
      </NavLogo>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </NavUl>
  </NavContainer>
);



export default Navigation;

const NavContainer = styled.div`  // Around Navbar
  background: #C2BAE2;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
`;
const NavLogo = styled.li`
  color: black;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  `


const HumIcon = styled.div`
display: none;

@media screen and (max-width: 960px) {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 60%);
  font-size: 1.8rem;
  cursor: pointer;
}
`

const NavUl = styled.ul`
  background-color: #c0b9dd;
  display: flex;
  text-transform: uppercase;
  align-items: center;
  list-style: none; 
  width: 100%;
  
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({click}) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;

    ;
  }
    li {
      padding: 10px 10px 10px 10px;
      margin: 10px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      font-weight: bold;
      transition: ease-in 0.2s;
      &:hover {
        background-color: white;
        transition: ease-in 0.2s;
      }
      @media screen and (max-width: 960px) {
        width: 100%;
        
        &:hover {
          border: none;
        }
      }
    a {
      color: black;
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      text-decoration: none;
      height: 100%;

      @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;

        &:hover {
          color: white;
          transition: ease-in 0.2s;
        }
      }
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