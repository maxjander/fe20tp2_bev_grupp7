import React, { useState, createContext, useEffect, useContext } from "react";
import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

export const CardContext = createContext({users: false, cards: false});

const CardContextProvider = (props) => {
  const [users, setUsers] = useState(false);
  const [cards, setCards] = useState(false);
  const authUser = props.authUser;
  console.log(authUser);
  useEffect(() => {
    props.firebase.cards().on("value", (snapshot) => {
      const cardObject = snapshot.val();
      if (cardObject && authUser) {
        const cardList = Object.keys(cardObject).map((key) => ({
          ...cardObject[key],
          uid: key,
        }));
        const filteredCards = cardList.filter(
          (card) => card.userId === authUser.uid
        );
        //Set CardList to state
        console.log("hej från cardcontext()");
        setCards(filteredCards);
        //approves loading of page
      } else {
        console.log("cardObject: " + cardObject + ", authuser: " + authUser)
      }
    });

    return () => {
      //when component unmounts, this disconncts form the cards entity of the
      //database
      props.firebase.cards().off();
    };
  }, [props.firebase]);
  //props.firebase
  console.log(authUser);
  // returnera en users deltan på ett visst kort

  return (
    <CardContext.Provider value={{ users, cards }}>
      {props.children}
    </CardContext.Provider>
  );
};

export default withFirebase(CardContextProvider);
