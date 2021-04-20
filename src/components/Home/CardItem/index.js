import { useState } from "react";
import styled from "styled-components";

import allData from "../../../constants/data.json";
import ListItemRender from "../ListItemRender";
import {
  FlexForm,
  StyledEditButton,
  StyledButton,
  StyledInput,
  StyledSelect,
  StyledUtilButtonContainer,
  StyledDeleteButton,
} from "../styledComponents";
import cardConditions from "../../../constants/cardConditions";

import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const CardItem = ({
  card,
  onRemoveCard,
  onEditCard,

  authUser,
  setClickedCard,
  handleCardPresentationToggleModal,
  image,
  toggleGridView,
}) => {
  const [apiCard, setApiCard] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editCardName, setEditCardName] = useState(card.cardName);
  const [editCardSet, setEditCardSet] = useState(card.cardSet);
  const [editCard_sets] = useState("");
  const [editCondition, setEditCondition] = useState(card.cardCondition);

  //   const LoadImage = toggleGridView ? null : <img src={image} />;
  //   const showHideClassName = toggleGridView ? "display-list" : "display-grid";

  const onChangeEditCardName = (event) => setEditCardName(event.target.value);

  //did not exist
  const onChangeEditCardSet = (event) => {
    //Function for setting Cardset to state, it's a callback from input field when adding cards.

    //setting index for selecting the right cardset
    let index = event.target.options.selectedIndex - 1;

    /*
      if the index is above or equal to zero it defines the state
      with an object with set_code and set_rarity_code.
      */
    if (index >= 0) {
      setEditCardSet({
        set_code: apiCard.card_sets[index].set_code,
        set_rarity_code: apiCard.card_sets[index].set_rarity_code,
      });
    }
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
            value={editCard_sets}
            onChange={onChangeEditCardSet}
            required="required"
          >
            <option key="1" value={card.cardSet}>
              {card.cardSet.set_code} - {card.cardSet.set_rarity_code}
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
            <StyledButton onClick={onSaveEditCard}>Save</StyledButton>
            <StyledButton onClick={onToggleEditMode}>Reset</StyledButton>
          </span>
        </FlexForm>
      ) : (
        //{message.userId} {message.text} //message.editedAt

        <StyledListItem
          className="single-card"
          onClick={() => {
            setClickedCard(card);
          }}
        >
          {/* {card.userId} */}
          <span onClick={handleCardPresentationToggleModal}>
            <ListItemRender
              condition={toggleGridView}
              card={card}
              image={image}
            />
          </span>
          <StyledUtilButtonContainer>
            <StyledEditButton onClick={onToggleEditMode}>
              <AiFillEdit />
            </StyledEditButton>
            <StyledDeleteButton
              onClick={() => onRemoveCard(card.uid, authUser)}
            >
              <BsTrash />
            </StyledDeleteButton>
          </StyledUtilButtonContainer>
        </StyledListItem>
      )}

      {/* clickedCard && <CardPresentation card={clickedCard}/> */}
    </>
  );
};

export default CardItem;

const StyledListItem = styled.li`
  display: flex;
  flex-wrap: nowrap;
  /* @media (max-width: 800px) {
    flex-direction: column;
  } */
`;
