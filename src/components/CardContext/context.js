import React, { useState, createContext, useEffect } from "react";
// import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import allData from "../../constants/data.json";

export const CardContext = createContext({ users: false, cards: false });

const CardContextProvider = (props) => {
  // const [users, setUsers] = useState(false);
  const [cards, setCards] = useState(false);
  const authUser = props.authUser;
  //console.log(authUser);
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
        /*  console.log("=============")
        console.log(filteredCards)
        console.log("=============") */
        const cardsWithImages = filteredCards.map((card) => {
          const tempCardObject = { ...card };
          let allDataCard = allData.data.find(
            (item) => Number(item.id) === Number(card.cardId)
          );
          //console.log(card.id)
          //console.log(allDataCard)
          tempCardObject.image = allDataCard["card_images"][0].image_url;
          return tempCardObject;
        });
        //Set CardList to state
        // console.log("hej från cardcontext()");
        // console.log("=============")
        setCards(cardsWithImages);
        // console.log("=============")
        // //approves loading of page
      } else {
        // console.log("cardObject: " + cardObject + ", authuser: " + authUser)
        return () => {
          //when component unmounts, this disconncts form the cards entity of the
          //database
          props.firebase.cards().off();
        };
      }
    });

    return () => {
      //when component unmounts, this disconncts form the cards entity of the
      //database
      props.firebase.cards().off();
    };
  }, [props.firebase, authUser]);
  //props.firebase
  //console.log(authUser);
  // returnera en users deltan på ett visst kort

  return (
    <CardContext.Provider value={{ cards }}>
      {props.children}
    </CardContext.Provider>
  );
};

export default withFirebase(CardContextProvider);
