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
  const showHideClassName = toggleGridView
    ? "card-list display-list"
    : "card-list display-grid";

  return cards ? (
    <>
      <StyledCardContainer>
        <div className={showHideClassName}>
          {/* onClick={handleCardPresentationToggleModal}> */}

          <StyledCardList>
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
        </div>
      </StyledCardContainer>
    </>
  ) : (
    <div>There are no cards ...</div>
  );
};
export default CardList;

const StyledCardContainer = styled.div`
  display: flex;
  z-index: 0;
  justify-content: center;
  /* max-width: 1000px; */
  flex-wrap: wrap;

  .card-list {
    display: flex;
    justify-content: space-around;
    list-style: none;
    flex-wrap: wrap;
    width: 100%;
  }
  /* display block when row */
  .single-card {
    display: flex; /* flex */
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
    /* height: 270px; */
    border: 1px solid;
    background-color: #d9d9d9;
    border-color: rgba(0, 0, 0, 0.3);
    margin: 4px;
    padding: 4px;

    border-radius: 8px;
    transition: all 0.1s ease-in-out;
    span {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    :hover {
      box-shadow: 1px 1px 16px -6px #000000;
    }
    /* .card-specs {
      margin: 0px;
    } */

    .image-container {
      margin: 2px;
    }

    .card-image {
      width: 150px;
    }
  }

  /*---Style these to change between grid and list view---*/
  .display-grid {
    display: flex;
    justify-content: space-around;
    list-style: none;
    flex-wrap: wrap;
  }

  .display-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style: none;
    margin: 0;

    .single-card {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      justify-content: space-between;
      width: 100%;
      /* height: 100%; */
      border: 1px solid;
      background-color: #d9d9d9;
      /* border-color: rgba(0, 0, 0, 0.3); */
      margin-bottom: 10px;

      border-radius: 8px;
      flex-wrap: wrap;
      span {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: space-between;

        /* @media (max-width: 920px) {
          flex-direction: column;
        } */
      }
    }

    .card-specs {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      margin-left: 6px;
    }
  }
`;

const StyledCardList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  flex-wrap: wrap;

  width: 100%;
`;
