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
  const [cardSet, setCardSet] = useState(null);
  const [cardCondition, setCardCondition] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [card_sets, setCard_sets] = useState([]);

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
    //text
    let index = event.target.options.selectedIndex - 1;
    if (index >= 0) {
      setCardSet(card_sets[index]);
    } else {
      setCardSet(null);
    }
  };
  //did not exist
  const onChangeCardCondition = (event) => setCardCondition(event.target.value);
  //onCreateMessage
  const onCreateCard = (event, authUser) => {
    //Checks if input is correct and voids the post if incorrect
    if (cardConditions.includes(cardCondition)) {
      props.firebase.cards().push({
        cardName: cardName,
        cardSet: cardSet,
        cardCondition: cardCondition,
        userId: authUser.uid,
        createdAt: props.firebase.serverValue.TIMESTAMP,
      });

      //Resets State when Card is created
      setCardName("");
      setCardSet(null);
      setCardCondition("");
      setCard_sets([]);
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

    // Filter out the card object from full datafile,
    //connect API here
    const cardArray = allData.data
      .filter((item) => item.name === props)
      .map((item) => item.card_sets);

    //temporary array to push to state
    const tmpArray = [];

    cardArray.map((item, index) =>
      item.map(({ set_rarity_code, set_code, set_name }) =>
        tmpArray.push({
          set_code,
          set_rarity_code,
          set_name,
        })
      )
    );

    // Updates state

    setCardName(props);
    setCard_sets(tmpArray);
    setCardSet(null);
  };
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <FlexContainer>
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

            {card_sets.length > 0 && (
              <StyledSelect
                onChange={onChangeCardSet}
                required='required'
                name='card__sets'
                placeholder='Card Sets'>
                <option> Select a Card Set</option>
                {card_sets.map((item, idx) => (
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

            {cardCondition && <button type='submit'>Add Card</button>}
          </FlexForm>
        </FlexContainer>
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
  const [editMode, setEditMode] = useState(false);
  const [editCardName, setEditCardName] = useState(card.cardName);
  const [editCardSet, setEditCardSet] = useState(card.cardSet);
  const [editCard_sets, setEditCard_sets] = useState(null);
  const [editCondition, setEditCondition] = useState(card.cardCondition);

  const onChangeEditCardName = (event) => setEditCardName(event.target.value);

  //did not exist
  const onChangeEditCardSet = (event) => {
    let index = event.target.options.selectedIndex - 1;
    setEditCardSet(editCard_sets[index]);
  };
  //did not exist
  const onChangeEditCondition = (event) => setEditCondition(event.target.value);
  //onsaveedittext

  const onToggleEditMode = () => {
    setEditMode(!editMode);
    const cardArray = allData.data
      .filter((item) => item.name === card.cardName)
      .map((item) => item.card_sets);

    //temporary array to push to state
    const tmpArray = [];

    cardArray.map((item, index) =>
      item.map(({ set_rarity_code, set_code, set_name }) =>
        tmpArray.push({
          set_code,
          set_rarity_code,
          set_name,
        })
      )
    );
    setEditCard_sets(tmpArray);
  };

  const onSaveEditCard = () => {
    //this.props.message, this.state.editText
    onEditCard(card, editCardName, editCardSet, editCondition);

    setEditMode(false);
  };
  return (
    <>
      {editMode ? (
        <FlexForm>
          <StyledInput //type='text' value={editText} onChange={this.onChangeEditText}
            type='text'
            value={editCardName}
            onChange={onChangeEditCardName}
            readOnly
          />
          <StyledSelect
            type='text'
            onChange={onChangeEditCardSet}
            required='required'>
            <option>Card Sets</option>
            {editCard_sets.map((item, idx) => (
              <option key={idx} value={item.set_code}>
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

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
`;

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
