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
  user = (uid) => this.db.ref(`users/${uid}`);
  userCardArray = (uid) => this.db.ref(`users/${uid}/cards`);
  users = () => this.db.ref("users");
  //gör samma sak för grafer
  //

  // *** Message API ***
  // message = uid => this.db.ref(`messages/${uid}`)
  // messages = () => this.db.ref('messages)
    
  card = (uid) => this.db.ref(`cards/${uid}`);

  cards = () => this.db.ref("cards");

  priceChangeDeltaValueHistory = (uid) => this.db.ref(`cards/${uid}/priceChangeDeltaValueHistory`);
}

export default Firebase;
