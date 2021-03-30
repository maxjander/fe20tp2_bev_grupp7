import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import styled from "styled-components";

import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import Autocomplete from "../Autocomplete";
import infoData from "../../constants/listOfNames.json";
import allData from "../../constants/data.json";
import cardConditions from "../../constants/cardConditions";

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Cards />
  </div>
);

const CardsBase = (props) => {
  const autoCompleteElement = React.createRef();
  const [cardName, setCardName] = useState("");
  const [apiCard, setApiCard] = useState(null);
  const [cardSet, setCardSet] = useState(null);
  const [cardCondition, setCardCondition] = useState("");
  const [setPrice, setSetPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buyPoint, setBuyPoint] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setLoading(true);
    //messages
    props.firebase.cards().on("value", (snapshot) => {
      const cardObject = snapshot.val();

      if (cardObject) {
        //convert cards list from snapshot
        const cardList = Object.keys(cardObject).map((key) => ({
          ...cardObject[key],
          uid: key,
        }));
        setCards(cardList);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => {
      props.firebase.cards().off();
    };
  }, [props.firebase]);

  const onChangeCardName = (event) => setCardName(event.target.value);
  //did not exist
  const onChangeCardSet = (event) => {
    //Function for setting Cardset to state, it's a callback from input field when adding cards.

    //setting index for selecting the right cardset
    let index = event.target.options.selectedIndex - 1;
    if (index >= 0) {
      setCardSet({
        set_code: apiCard.card_sets[index].set_code,
        set_rarity_code: apiCard.card_sets[index].set_rarity_code,
      });
      setSetPrice(apiCard.card_sets[index].set_price);
    } else {
      setCardSet(null);
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
          cardSet: cardSet,
          cardCondition: cardCondition,
          buy_point: buyPoint,
          marketPrice: {
            marketPriceDateAdded: setPrice,
          },
          userId: authUser.uid,
          createdAt: props.firebase.serverValue.TIMESTAMP,
        })

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

      //Resets State when Card is created
      setCardName("");
      setCardSet(null);
      setCardCondition("");
      setApiCard(null);

      //This changes states on our child when Card is created
      autoCompleteElement.current.setState({
        userInput: "",
      });
    }
    event.preventDefault();
  };

  //onRemoveMessage
  const onRemoveCard = (uid) => {
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
  const autoCompleteCallback = (props) => {
    // Callback function to send down the component tree to update state
    const innerApiCard = allData.data.find((item) => item.name === props);

    setApiCard(innerApiCard);
    setCardName(props);
    setCardSet(null);
  };
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          {loading && <div>Loading...</div>}
          {/*messages*/}
          {cards /*MessageList*/ ? (
            <CardList /*propmessages, oneditmessage, onremovemessage */
              cards={cards}
              onEditCard={onEditCard}
              onRemoveCard={onRemoveCard}
              props={props}
              authUser={authUser}
            />
          ) : (
            <div>There are no cards ...</div>
          )}

          <FlexForm onSubmit={(event) => onCreateCard(event, authUser)}>
            <Autocomplete
              ref={autoCompleteElement}
              type='text'
              value={cardName}
              onChange={onChangeCardName}
              name='cardName'
              min='3'
              required='required'
              suggestions={infoData}
              autoCompleteCallback={autoCompleteCallback}
            />

            {apiCard && apiCard.card_sets.length > 0 && (
              <StyledSelect
                onChange={onChangeCardSet}
                required='required'
                name='card__sets'
                placeholder='Card Sets'>
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
                type='text'
                value={cardCondition}
                onChange={onChangeCardCondition}
                required='required'
                placeholder='Condition'>
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
                type='number'
                value={buyPoint}
                onChange={onChangeBuyPoint}
                required='required'
                placeholder='What did you pay?'
              />
            )}

            {buyPoint && <button type='submit'>Add Card</button>}
          </FlexForm>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const CardList = ({
  cards, //messages
  onEditCard, //oneditmessage
  onRemoveCard,
  props,
  authUser, //onremovemessage
}) => {
  return (
    <ul>
      {cards.map(
        (card) =>
          card.userId === authUser.uid && (
            <CardItem //MessageItem
              key={card.uid} //message.uid
              card={card}
              onEditCard={onEditCard}
              onRemoveCard={onRemoveCard}
              props={props}
            />
          )
      )}
    </ul>
  );
};
const CardItem = ({ card, onRemoveCard, onEditCard, props }) => {
  const [apiCard, setApiCard] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editCardName, setEditCardName] = useState(card.cardName);
  const [editCardSet, setEditCardSet] = useState(card.cardSet);
  const [editCard_sets, setEditCard_sets] = useState(null);
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
            type='text'
            value={apiCard.name}
            onChange={onChangeEditCardName}
            readOnly
          />
          <StyledSelect
            type='text'
            value={editCardSet}
            onChange={onChangeEditCardSet}
            required='required'>
            <option key='1' value={card.cardSet.set_code}>
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
            type='text'
            value={editCondition}
            onChange={onChangeEditCondition}
            required='required'
            placeholder='Condition'>
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
          <span>
            {/* {card.userId} */}
            <strong> {card.cardName}</strong> {card.cardSet.set_code}{" "}
            <em>{card.cardSet.set_rarity_code}</em> {card.cardCondition}
            {card.editedAt && (
              <span
                title={`Edited at: ${new Date(
                  card.editedAt
                ).toLocaleTimeString()}`}>
                (Edited)
              </span>
            )}
          </span>
          <span>
            <button onClick={onToggleEditMode}>Edit</button>
            <button onClick={() => onRemoveCard(card.uid)}>Delete</button>
          </span>
        </li>
      )}
    </>
  );
};

const Cards = withFirebase(CardsBase);
const condition = (authUser) => !!authUser;
export default compose(withAuthorization(condition))(HomePage);

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSelect = styled.select`
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;
`;
