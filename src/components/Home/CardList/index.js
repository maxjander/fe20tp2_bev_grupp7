import styled from "styled-components";

import CardItem from "../CardItem";

/*---CARD LIST THAT SHOWS ALL CARDS USER OWNS---*/
const CardList = ({
  cards, //messages
  props,
  authUser, //onremovemessage
  toggleGridView,
  firebase,
}) => {
  const showHideClassName = toggleGridView ? "display-list" : "display-grid";
  const onEditCard = (card, cardName, cardSet, cardCondition) => {
    const { uid, ...cardSnapshot } = card;

    firebase.card(card.uid).set({
      ...cardSnapshot,
      cardName,
      cardSet,
      cardCondition,
      editedAt: firebase.serverValue.TIMESTAMP,
    });
  };

  const onRemoveCard = (uid, authUser) => {
    firebase.userCardArray(authUser.uid).child(uid).remove();
    firebase.card(uid).remove();
  };

  return cards ? (
    <>
      <StyledCardContainer>
        {/* <div className={showHideClassName}> */}
        {/* onClick={handleCardPresentationToggleModal}> */}

        <StyledCardList className={showHideClassName}>
          {cards.map(
            (card) =>
              card.userId === authUser.uid && (
                <CardItem //MessageItem
                  key={card.uid} //message.uid
                  card={card}
                  onEditCard={onEditCard}
                  onRemoveCard={onRemoveCard}
                  props={props}
                  authUser={authUser}
                  image={card.image}
                  toggleGridView={toggleGridView}
                />
              )
          )}
        </StyledCardList>
        {/* </div> */}
      </StyledCardContainer>
    </>
  ) : (
    <div>There are no cards ...</div>
  );
};
export default CardList;

const StyledCardContainer = styled.div`
  .display-grid {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    list-style: none;
    width: 100%;
  }

  .display-list {
    list-style: none;
    width: 100%;
  }
`;

const StyledCardList = styled.ul``;
