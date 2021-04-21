import React, { useState } from "react";

import allData from "../../constants/data.json";
import Autocomplete from "../Autocomplete";
import cardConditions from "../../constants/cardConditions";
import infoData from "../../constants/listOfNames.json";
import {
  FlexForm,
  StyledSelect,
  StyledInput,
  StyledButton,
} from "../Home/styledComponents";
const AddCard = ({ firebase, authUser }) => {
  console.log(firebase);
  const autoCompleteElement = React.createRef();
  const [cardName, setCardName] = useState("");
  const [apiCard, setApiCard] = useState(null);
  const [cardSet, setCardSet] = useState("");
  const [cardCondition, setCardCondition] = useState("");
  const [setPrice, setSetPrice] = useState(null);
  const [buyPoint, setBuyPoint] = useState(null);
  // const [toggleModal, setToggleModal] = useState(false);

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
      firebase
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
          priceChangeDeltaValueHistory: { [Date.now()]: 0 },
          userId: authUser.uid,
          createdAt: firebase.serverValue.TIMESTAMP,
        })
        /*
  Above pushes our card to firebase, with the values from state
  */
        .then((res) => {
          let createdCardId = res.getKey();
          firebase.userCardArray(authUser.uid).child(createdCardId).set(true);
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
      // setToggleModal(false);
      //This changes states on the autocomplete when Card is created
      // autoCompleteElement.current.setState({
      //   userInput: "",
      // });
    }
    event.preventDefault();
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
    <>
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
            value={cardSet.set_code || ""}
            required='required'>
            <option> Select a Card Set</option>
            {apiCard.card_sets.map((item, idx) => (
              <option key={idx} value={item.set_code}>
                {item.set_code} -{item.set_rarity_code}
              </option>
            ))}
          </StyledSelect>
        )}
        {cardSet && (
          <StyledSelect
            type='text'
            value={cardCondition || ""}
            onChange={onChangeCardCondition}
            required='required'>
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
            value={buyPoint || ""}
            onChange={onChangeBuyPoint}
            required='required'
            placeholder='What did you pay?'
          />
        )}

        {buyPoint && <StyledButton type='submit'>Add Card</StyledButton>}
      </FlexForm>
      <br />
      {/* <StyledButton onClick={setVisable}>Close</StyledButton> */}
    </>
  );
};

export default AddCard;
