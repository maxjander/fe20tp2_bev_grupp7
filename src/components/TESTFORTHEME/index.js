import React, {useEffect} from "react";
import {withFirebase} from "../Firebase";

const ThemePush = (props) => {

    useEffect(() => {
        const getuserFBID = localStorage.getItem('authUser');
        const getUserPars = JSON.parse(getuserFBID);
        console.log(getUserPars.uid);
        console.log(getUserPars.theme);

        props.firebase.users().once('value').then((snapshot) => {


            

            props.firebase.users().child(getUserPars.uid).child('theme').set(getUserPars.theme);
        }
        )




    }, [props.firebase])

    return (
        <div>
            
        </div>
    )
}

const ThemeABC = withFirebase(ThemePush);
export default ThemeABC;