import React from "react";

const FirebaseContext = React.createContext(null);

/*
    Takes a component, and its props, and wraps it within the FirebaseContext. 
    In addition, it adds another prop: firebase
*/

export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
