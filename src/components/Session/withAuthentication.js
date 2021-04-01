import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem("authUser")),
      };
    }
    /*
    function that takes two functions as parameters (also known as lambda), a next and a fallback. once loaded, the next function triggers and sets us an access token in our local storage. if failed, it sets the access token to null
    */
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser) => {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem("authUser");
          this.setState({ authUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }
    /*
    Takes a component, and its props, and wraps it within the AuthUserContext. 
*/
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
