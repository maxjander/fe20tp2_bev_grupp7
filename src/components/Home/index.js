import React, { useState, useEffect, useRef } from "react";
import { compose } from "recompose";
import styled from "styled-components";
import ApiFetch from "../ApiFetch";
import { Doughnut } from "react-chartjs-2";
import PortfolioGraph from "../Graph";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import Autocomplete from "../Autocomplete";
import CardPresentation from "../CardPresentation";
import infoData from "../../constants/listOfNames.json";
import allData from "../../constants/data.json";
import cardConditions from "../../constants/cardConditions";

/*
  HomePage
  functional component that renders card component
*/

const HomePage = () => (
  <StyledHomeComponent>
    <div>
      <h1>Home</h1>
      <p>The Home Page is accessible by every signed in user.</p>
      <Cards />
    </div>
  </StyledHomeComponent>
);

/*
  Cards component is CardsBase component withFirebaseContext
*/

const CardsBase = (props) => {
  /*
  autocompletelement creates ref to this state to Autocomplete Component
  */
  const autoCompleteElement = React.createRef();
  const [cardName, setCardName] = useState("");
  const [apiCard, setApiCard] = useState(null);
  const [cardSet, setCardSet] = useState("");
  const [cardCondition, setCardCondition] = useState("");
  const [setPrice, setSetPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buyPoint, setBuyPoint] = useState(null);
  const [cards, setCards] = useState([]);

  const [toggleModal, setToggleModal] = useState(false);

  const [
    toggleCardPresentationModal,
    setToggleCardPresentationModal,
  ] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);

  // const node = useRef(); //ref for modal to cancel onmousedown
  // const presentationNode = useRef(); //ref for presentationmodal cancel onmousedown

  const [toggleGridView, setToggleGridView] = useState(false); //grid: false //grid:true

  /*
  useEffect is react hooks version of componentdidmount

  And its return is hooks version of componentwillunmount
  */
  useEffect(() => {
    setLoading(true);
    //messages
    props.firebase.cards().on("value", (snapshot) => {
      const cardObject = snapshot.val();

      if (cardObject) {
        //convert cards list from snapshot

        /*
          takes a snapshot off all cards, and takes the cards uniqe id 
          and adds it the cardobject.
        */
        const cardList = Object.keys(cardObject).map((key) => ({
          ...cardObject[key],
          uid: key,
        }));

        //Set CardList to state
        setCards(cardList);
        //approves loading of page
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => {
      //when component unmounts, this disconncts form the cards entity of the
      //database
      props.firebase.cards().off();
    };
  }, [props.firebase]);

  const handleToggleModal = () => {
    setCardName("");
    setCardSet("");
    setCardCondition("");
    setApiCard(null);
    // setToggleModal(false);
    autoCompleteElement.current.setState({
      userInput: "",
    });
    setToggleModal(!toggleModal);
  };

  const handleCardPresentationToggleModal = () => {
    console.log("i handlecardpresentation");
    setToggleCardPresentationModal(!toggleCardPresentationModal);
  };

  const handleToggleGridView = () => setToggleGridView(!toggleGridView); //grid: false -> grid: true

  const onChangeCardName = (event) => setCardName(event.target.value);
  //did not exist
  const onChangeCardSet = (event) => {
    //Function for setting Cardset to state, it's a callback from input field when adding cards.

    //setting index for selecting the right cardset
    let index = event.target.options.selectedIndex - 1;

    /*
    if the index is above or equal to zero it defines the state
    with an object with set_code and set_rarity_code.
    */
    if (index >= 0) {
      setCardSet({
        set_code: apiCard.card_sets[index].set_code,
        set_rarity_code: apiCard.card_sets[index].set_rarity_code,
      });

      setSetPrice(apiCard.card_sets[index].set_price);
    } else {
      setCardSet("");
    }
  }; //did not exist
  const onChangeCardCondition = (event) => setCardCondition(event.target.value);
  const onChangeBuyPoint = (event) => setBuyPoint(event.target.value);
  //onCreateMessage

  const onCreateCard = (event, authUser) => {
    //Checks if input is correct and voids the post if incorrect
    // https://firebase.google.com/docs/database/ios/structure-data
    if (cardConditions.includes(cardCondition)) {
      props.firebase
        .cards()
        .push({
          cardId: apiCard.id,
          cardName: cardName,
          cardSet: cardSet,
          cardCondition: cardCondition,
          buy_point: buyPoint,
          marketPrice: {
            marketPriceDateAdded: setPrice,
          },
          priceChangeDeltaValueHistory: [
            { x: props.firebase.serverValue.TIMESTAMP, y: 0 },
          ],
          userId: authUser.uid,
          createdAt: props.firebase.serverValue.TIMESTAMP,
        })
        /*
  Above pushes our card to firebase, with the values from state
  */
        .then((res) => {
          let createdCardId = res.getKey();
          props.firebase
            .userCardArray(authUser.uid)
            .child(createdCardId)
            .set(true);
          console.log(
            "card " + createdCardId,
            " + user " + authUser.uid,
            "responsebody " + res
          );
        });
      /* 
        Above takes the response from the push and gets the new uid for the card
        and sets it to the correct user
*/

      //Resets State when Card is created
      setCardName("");
      setCardSet("");
      setCardCondition("");
      setApiCard(null);
      setToggleModal(false);

      //This changes states on the autocomplete when Card is created
      autoCompleteElement.current.setState({
        userInput: "",
      });
    }
    event.preventDefault();
  };

  //onRemoveMessage
  const onRemoveCard = (uid, authUser) => {
    props.firebase.userCardArray(authUser.uid).child(uid).remove();
    props.firebase.card(uid).remove();
  };
  //oneditmessage //message //text
  const onEditCard = (card, cardName, cardSet, cardCondition) => {
    const { uid, ...cardSnapshot } = card;

    props.firebase.card(card.uid).set({
      ...cardSnapshot,
      cardName,
      cardSet,
      cardCondition,
      editedAt: props.firebase.serverValue.TIMESTAMP,
    });
  };
  const autoCompleteCallback = (cardNameFromAutoComplete) => {
    // Callback function to send down the component tree to update state
    const innerApiCard = allData.data.find(
      (item) => item.name === cardNameFromAutoComplete
    );

    setApiCard(innerApiCard);
    setCardName(cardNameFromAutoComplete);
    setCardSet("");
  };
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          {cards ? <PortfolioGraph cards={cards} authUser={authUser} /> : null}

          {loading && <div>Loading...</div>}
          {/*messages*/}
          {cards /*MessageList*/ ? (
            <>
              <CardList /*propmessages, oneditmessage, onremovemessage */
                cards={cards}
                onEditCard={onEditCard}
                onRemoveCard={onRemoveCard}
                props={props}
                authUser={authUser}
                toggleGridView={toggleGridView}
                handleToggleGridView={handleToggleGridView}
                setClickedCard={setClickedCard}
                handleCardPresentationToggleModal={
                  handleCardPresentationToggleModal
                }
              />
            </>
          ) : (
            <div>There are no cards ...</div>
          )}

          <StyledModal>
            <CardPresentationModal
              // ref={presentationNode}
              handleCardPresentationToggleModal={
                handleCardPresentationToggleModal
              }
              toggleCardPresentationModal={toggleCardPresentationModal}
              authUser={authUser}
            >
              {clickedCard && <CardPresentation card={clickedCard} />}
            </CardPresentationModal>
          </StyledModal>

          <StyledModal>
            <AddCardModal
              // ref={node}
              handleToggleModal={handleToggleModal}
              toggleModal={toggleModal}
              authUser={authUser}
            >
              <FlexForm onSubmit={(event) => onCreateCard(event, authUser)}>
                <Autocomplete
                  ref={autoCompleteElement}
                  type="text"
                  value={cardName}
                  onChange={onChangeCardName}
                  name="cardName"
                  min="3"
                  required="required"
                  suggestions={infoData}
                  autoCompleteCallback={autoCompleteCallback}
                />

                {apiCard && apiCard.card_sets.length > 0 && (
                  <StyledSelect
                    onChange={onChangeCardSet}
                    value={cardSet.set_code || ""}
                    required="required"
                  >
                    <option> Select a Card Set</option>
                    {apiCard.card_sets.map((item, idx) => (
                      <option key={idx} value={item.set_code}>
                        {item.set_code} -{item.set_rarity_code}
                      </option>
                    ))}
                  </StyledSelect>
                )}

                {/* 
                            Renders datalist of cardsets after Card is chosen 
                            */}

                {cardSet && (
                  <StyledSelect
                    type="text"
                    value={cardCondition || ""}
                    onChange={onChangeCardCondition}
                    required="required"
                  >
                    <option>What Condition is your card?</option>
                    {cardConditions.map((item, idx) => (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    ))}
                  </StyledSelect>
                )}
                {cardCondition && (
                  <StyledInput
                    type="number"
                    value={buyPoint || ""}
                    onChange={onChangeBuyPoint}
                    required="required"
                    placeholder="What did you pay?"
                  />
                )}

                {buyPoint && <button type="submit">Add Card</button>}
              </FlexForm>
            </AddCardModal>
          </StyledModal>

          <button type="button" onClick={handleToggleModal}>
            Open
          </button>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const CardPresentationModal = ({
  handleCardPresentationToggleModal,
  toggleCardPresentationModal,
  children,
}) => {
  const showHideClassName = toggleCardPresentationModal
    ? "modal display-block"
    : "modal display-none";
  const presentationNode = useRef();

  // const handleClick = (e) => {
  //   if (presentationNode.current.contains(e.target)) {
  //     return;
  //   }
  //   handleCardPresentationToggleModal();
  // };

  useEffect(() => {
    const handleClick = (e) => {
      if (presentationNode.current.contains(e.target)) {
        return;
      }
      handleCardPresentationToggleModal();
    };

    if (toggleCardPresentationModal === true) {
      window.addEventListener("mousedown", handleClick);
    } else {
      window.removeEventListener("mousedown", handleClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleCardPresentationModal]);

  return (
    <div className={showHideClassName}>
      <section className="modal-main" ref={presentationNode}>
        {children}
        <br />
        <button onClick={handleCardPresentationToggleModal}>Close</button>
      </section>
    </div>
  );
};

const AddCardModal = ({ handleToggleModal, toggleModal, children }) => {
  const showHideClassName = toggleModal
    ? "modal display-block"
    : "modal display-none";
  const node = useRef();

  // const handleClick = (e) => {
  //   if (node.current.contains(e.target)) {
  //     return;
  //   }
  //   handleToggleModal();
  // };

  useEffect(() => {
    const handleClick = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      handleToggleModal();
    };

    if (toggleModal === true) {
      window.addEventListener("mousedown", handleClick);
    } else {
      window.removeEventListener("mousedown", handleClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal]);

  return (
    <div className={showHideClassName}>
      <section className="modal-main" ref={node}>
        {children}
        <br />
        <button onClick={handleToggleModal}>Close</button>
      </section>
    </div>
  );
};

// const CloseModal = (handleToggleModal, toggleModal) => {
//   .addEventListener('mousedown', console.log('TJENA'))
// }

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

  return (
    <>
      <StyledCardContainer>
        <div
          className={showHideClassName}
          onClick={handleCardPresentationToggleModal}
        >
          <ul className="card-list">
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
                  />
                )
            )}
          </ul>
        </div>
      </StyledCardContainer>

      <button onClick={handleToggleGridView}>grid</button>
    </>
  );
};
const CardItem = ({
  card,
  onRemoveCard,
  onEditCard,
  props,
  authUser,
  setClickedCard,
}) => {
  const [apiCard, setApiCard] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editCardName, setEditCardName] = useState(card.cardName);
  const [editCardSet, setEditCardSet] = useState(card.cardSet);
  const [editCard_sets, setEditCard_sets] = useState("");
  const [editCondition, setEditCondition] = useState(card.cardCondition);

  const onChangeEditCardName = (event) => setEditCardName(event.target.value);

  //did not exist
  const onChangeEditCardSet = (event) => {
    setEditCardSet(event.target.value);
  };
  //did not exist
  const onChangeEditCondition = (event) => setEditCondition(event.target.value);
  //onsaveedittext

  const onToggleEditMode = () => {
    setEditMode(!editMode);
    const innerApiCard = allData.data.find((item) => item.id === card.cardId);
    innerApiCard && console.log(innerApiCard);
    //temporary array to push to state

    setApiCard(innerApiCard);
  };

  const onSaveEditCard = () => {
    //this.props.message, this.state.editText
    onEditCard(card, editCardName, editCardSet, editCondition);

    setEditMode(false);
  };
  return (
    <>
      {editMode && apiCard ? (
        <FlexForm>
          <StyledInput //type='text' value={editText} onChange={this.onChangeEditText}
            type="text"
            value={apiCard.name}
            onChange={onChangeEditCardName}
            readOnly
          />
          <StyledSelect
            type="text"
            value={editCardSet}
            onChange={onChangeEditCardSet}
            required="required"
          >
            <option key="1" value={card.cardSet.set_code}>
              {card.cardSet.set_code} - {card.cardSet.set_rarity.code}
            </option>
            -------
            {apiCard.card_sets.map((item, idx) => (
              <option key={idx} value={item.card_set}>
                {item.set_code} - {item.set_rarity_code}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            type="text"
            value={editCondition}
            onChange={onChangeEditCondition}
            required="required"
            placeholder="Condition"
          >
            <option>What Condition is your card?</option>
            {cardConditions.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </StyledSelect>
          <span>
            <button onClick={onSaveEditCard}>Save</button>
            <button onClick={onToggleEditMode}>Reset</button>
          </span>
        </FlexForm>
      ) : (
        //{message.userId} {message.text} //message.editedAt
        <li>
          <div className="single-card" onClick={() => setClickedCard(card)}>
            {/* {card.userId} */}
            <div className="card-title">
              <strong>{card.cardName}</strong>
            </div>

            <div className="card-specs">{card.cardSet.set_code}</div>
            <div className="card-specs">
              <em>{card.cardSet.set_rarity_code}</em>
            </div>
            <div className="card-specs">{card.cardCondition}</div>

            {card.editedAt && (
              <span
                title={`Edited at: ${new Date(
                  card.editedAt
                ).toLocaleTimeString()}`}
              >
                (Edited)
              </span>
            )}

            <button className="card-buttons" onClick={onToggleEditMode}>
              Edit
            </button>
            <button
              className="card-buttons"
              onClick={() => onRemoveCard(card.uid, authUser)}
            >
              Delete
            </button>
          </div>
        </li>
      )}

      {/* clickedCard && <CardPresentation card={clickedCard}/> */}
    </>
  );
};

const Cards = withFirebase(CardsBase);
const condition = (authUser) => !!authUser;
export default compose(withAuthorization(condition))(HomePage);

/*---THE ENTIRE HOME COMPONENT STYLE---*/
const StyledHomeComponent = styled.div`
  display: flex;
  justify-content: center;

  button {
    position: relative;
    display: block;
    margin: 2px;
    width: 120px;
    height: 26px;
    border-radius: 18px;
    background-color: #1c89ff;
    border: solid 1px transparent;
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover {
      background-color: #39375b;
      border-color: #fff;
      transition: all 0.1s ease-in-out;
    }
  }

  .card-buttons {
    width: auto;
    margin-top: 4px;
    margin-bottom: 0px;
    align-self: center;
    padding: 0 15px;
  }

  .card-title {
    font-size: 20px;
    margin: 0px;
    align-self: center;
  }
`;

const StyledModal = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);

    .modal-main {
      position: fixed;
      background: white;
      width: 80%;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  /*---MODAL SETTINGS---*/
  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`;

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/*---STYLED SELECTS, dropdowns---*/
const StyledSelect = styled.select`
  border-radius: 8px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;

  :focus {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

/*---STYLED INPUT, The search/add card field*/
const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;
`;

/*---CARD LIST, card list with all users card at the top of home component---*/
const StyledCardContainer = styled.div`
  display: flex;
  z-index: 0;
  justify-content: center;
  max-width: 1000px;

  .card-list{
    display: flex; 
    justify-content: space-between;
    list-style: none;
    flex-wrap: wrap;
    width: 100vh;
  }
 /* display block when row */
  .single-card{
    display: flex; /* flex */
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
    height: 270px;
    border: 1px solid;
    background-color: white;
    border-color: rgba(0,0,0,0.3);
    margin: 4px;
    padding: 4px;
    border-radius: 8px;
    transition: all .1s ease-in-out;

    :hover{
      box-shadow: 1px 1px 16px -6px #000000;
    }
    .card-specs{
      margin: 0px;
    }

    .image-container{
      margin: 2px;
    }

    .card-image{
      width: 150px;
    }
  }

              /*---Style these to change between grid and list view---*/
  .display-grid {
    display: flex; 
    justify-content: space-between;
    list-style: none;
    flex-wrap: wrap;
  }
  
  .display-list {
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    list-style: none;
    flex-wrap: wrap;
    margin: 0;
    width: 100vh;
    
    .single-card {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    width: 98vh;
    height: 70px;
    border: 1px solid;
    background-color: white;
    border-color: rgba(0,0,0,0.3);
    margin: 4px;
    padding: 4px;
    border-radius: 8px;
    flex-wrap: wrap;
  }

  .card-specs{
      display: flex;
      flex-direction: row; 
      justify-content: space-between;
      align-items: center;
      margin-left: 6px;
    }
`;
