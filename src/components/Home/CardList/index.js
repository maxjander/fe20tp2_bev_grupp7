import styled from "styled-components";

import CardItem from "../CardItem";

/*---CARD LIST THAT SHOWS ALL CARDS USER OWNS---*/
const CardList = ({
  cards, //messages
  onEditCard, //oneditmessage
  onRemoveCard,
  props,
  authUser, //onremovemessage
  handleToggleGridView, //toggle grid
  toggleGridView,
  setClickedCard,
  handleCardPresentationToggleModal,
}) => {
  const showHideClassName = toggleGridView ? "display-list" : "display-grid";

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
                  setClickedCard={setClickedCard}
                  onEditCard={onEditCard}
                  onRemoveCard={onRemoveCard}
                  props={props}
                  authUser={authUser}
                  handleCardPresentationToggleModal={
                    handleCardPresentationToggleModal
                  }
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
