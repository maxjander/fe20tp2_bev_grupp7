import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { withFirebase } from "../Firebase";

/* Helper
    To Use this component, import it as ListOfCards as it is exported, 
    ad pass in user id of the list of cards you want.

    <ListOfCards userId={userId} />

*/

const ExternalCardList = (props) => {
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.firebase.cards().on("value", (snapshot) => {
      const cardObject = snapshot.val();

      if (cardObject) {
        //convert cards list from snapshot
        const cardList = Object.keys(cardObject)
          .map((key) => ({
            ...cardObject[key],
            uid: key,
          }))
          .filter((card) => card.userId === props.userId);

        setCards(cardList);
        console.log(cardList);
        setLoading(false);
      } else {
        setLoading(false);
      }
      return () => {
        props.firebase.cards().off();
      };
    });
  }, [props.userId, props.firebase]);

  return (
    <StyledUl>
      {loading && <li>Loading....</li>}
      {cards &&
        cards.map((card) => (
          <>
            <StyledLi key={card.uid}>
              <strong>
                {card.cardName} {card.cardSet.set_rarity_code}
              </strong>
            </StyledLi>

            <p>
              {card.cardSet.set_name} - {card.cardSet.set_code}
            </p>
          </>
        ))}
    </StyledUl>
  );
};
export const ListOfCards = withFirebase(ExternalCardList);

const StyledLi = styled.li`
  list-style: none;
`;

const StyledUl = styled.ul`
  padding-left: 0;
  p {
    margin: 0;
    font-size: 12px;
    padding-top: 0;
    padding-bottom: 16px;
  }
`;
