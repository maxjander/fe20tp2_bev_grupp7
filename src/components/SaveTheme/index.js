import React, {useCallback} from "react";
import {withFirebase} from "../Firebase";

const ThemePush = (props) => {

    const updateTheme = useCallback(() => {
        const getuserFBID = localStorage.getItem('authUser');
        const getUserPars = JSON.parse(getuserFBID);

            props.firebase.users().child(getUserPars.uid).child('theme').set(getUserPars.theme);

    }, [props.firebase])

    return (
        <div>
            <button onClick={updateTheme} >Save Theme</button>
        </div>
    )
}

const SaveTheme = withFirebase(ThemePush);
export default SaveTheme;