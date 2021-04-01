import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBANFNxAWCTJ5ebIYUr200-NLhkfAOOkOc",
  authDomain: "new-react-firebase.firebaseapp.com",
  databaseURL:
    "https://new-react-firebase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "new-react-firebase",
  storageBucket: "new-react-firebase.appspot.com",
  messagingSenderId: "161481017945",
  appId: "1:161481017945:web:6f5e4e759193a8db20bf48",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */
    this.serverValue = app.database.ServerValue;

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** AUTH API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API ***

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();

            //default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            //merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  /*
    All functions below ar refs to diffrent places in our 
    firebase database
*/

  /*
    user = a reference to a specific user, provided as a parameter 
    in the function
*/
  user = (uid) => this.db.ref(`users/${uid}`);

  /*
    userCardArray = a reference to a instance in a specific users cards in the 
    users entity 
*/
  userCardArray = (uid) => this.db.ref(`users/${uid}/cards`);

  /*
    users = a reference to acces all users
 */
  users = () => this.db.ref("users");

  /*
    Ref to Road to firebase
  *** Message API ***
  message = uid => this.db.ref(`messages/${uid}`)
  messages = () => this.db.ref('messages)

  */

  /*
    card = a ref to a specific card in the cards entity takes id as a parameter
  */
  card = (uid) => this.db.ref(`cards/${uid}`);

  /*
    cards = a ref to all cards in the cards entity
*/
  cards = () => this.db.ref("cards");
}

export default Firebase;
