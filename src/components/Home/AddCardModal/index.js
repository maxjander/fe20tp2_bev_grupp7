import React, { useRef, useEffect } from "react";

import Autocomplete from "../../Autocomplete";

import {
  StyledButton,
  StyledModalMain,
  StyledModal,
  FlexForm,
  StyledSelect,
  StyledInput,
} from "../styledComponents";
const AddCardModal = ({
  handleToggleModal,
  toggleModal,
  authUser,
  onCreateCard,
  cardName,
  onChangeCardName,
  infoData,
  autoCompleteCallback,
  apiCard,
  onChangeCardSet,
  cardSet,
  cardCondition,
  onChangeCardCondition,
  cardConditions,
  buyPoint,
  onChangeBuyPoint,
}) => {
  const autoCompleteElement = React.createRef();

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
  }, [toggleModal, handleToggleModal]);
  return toggleModal ? (
    <StyledModal>
      <StyledModalMain ref={node}>
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
        <StyledButton onClick={handleToggleModal}>Close</StyledButton>
      </StyledModalMain>
    </StyledModal>
  ) : (
    <></>
  );
};

export default AddCardModal;
