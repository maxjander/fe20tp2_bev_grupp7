import React, { useCallback } from "react";
import { withFirebase } from "../Firebase";
import Toggle from "./../Toggle/Toggle";
const ThemePush = ({ firebase, theme, toggleTheme }) => {
  const updateTheme = useCallback(() => {
    const getuserFBID = localStorage.getItem("authUser");
    const getUserPars = JSON.parse(getuserFBID);

    //props.firebase.users().child(getUserPars.uid).child('theme').set(getUserPars.theme);
    firebase.user(getUserPars.uid).child("theme").set(getUserPars.theme);
  }, [firebase]);

  return (
    <div onClick={updateTheme}>
      <Toggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

const SaveTheme = withFirebase(ThemePush);
export default SaveTheme;
