import styled from "styled-components";
import { breakpoints } from "../../../constants/breakpoints.js";

import InventoryUtilButtons from "../InventoryUtilButtons";

const ListItemRender = ({
  condition,
  card,
  image,
  authUser,
  onRemoveCard,
  onToggleEditMode,
  handleCardPresentationToggleModal,
}) =>
  condition ? (
    <ListItemList
      card={card}
      onRemoveCard={onRemoveCard}
      onToggleEditMode={onToggleEditMode}
      authUser={authUser}
      handleCardPresentationToggleModal={handleCardPresentationToggleModal}
    />
  ) : (
    <ListItemGrid
      card={card}
      image={image}
      onRemoveCard={onRemoveCard}
      onToggleEditMode={onToggleEditMode}
      authUser={authUser}
      handleCardPresentationToggleModal={handleCardPresentationToggleModal}
    />
  );

const ListItemList = ({
  card,
  onRemoveCard,
  onToggleEditMode,
  authUser,
  handleCardPresentationToggleModal,
}) => (
  <>
    <StyledListItem>
      <StyledContainerInfoList>
        <StyledInfoList onClick={handleCardPresentationToggleModal}>
          <StyledCardTitleList children={card.cardName} />
          <StyledUtilDiv>
            <StyledCardSpecsCardSet children={card.cardSet.set_code} />
            <StyledCardSpecsRarityList
              children={card.cardSet.set_rarity_code}
            />
            <StyledCardSpecsConditionList children={card.cardCondition} />
          </StyledUtilDiv>
        </StyledInfoList>
        <InventoryUtilButtons
          onRemoveCard={onRemoveCard}
          onToggleEditMode={onToggleEditMode}
          card={card}
          authUser={authUser}
        />
      </StyledContainerInfoList>
    </StyledListItem>
  </>
);
const ListItemGrid = ({
  card,
  image,
  onRemoveCard,
  onToggleEditMode,
  authUser,
  handleCardPresentationToggleModal,
}) => (
  <>
    <StyledGridItem>
      <span onClick={handleCardPresentationToggleModal}>
        <img src={image} width="100%" height="auto" alt={card.cardName} />
        <StyledCardSpecsNameGrid children={card.cardName} />
        <StyledCardSpecs children={card.cardSet.set_code} />
        <StyledCardSpecs children={card.cardSet.set_rarity_code} />
        <StyledCardSpecs children={card.cardCondition} />
      </span>
      <InventoryUtilButtons
        onRemoveCard={onRemoveCard}
        onToggleEditMode={onToggleEditMode}
        card={card}
        authUser={authUser}
      />
    </StyledGridItem>
  </>
);
export default ListItemRender;

const StyledInfoList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  :nth-child(0) {
    justify-content: flex-start !important;
  }
  :nth-child(1) {
    background-color: flex-end;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledCardSpecs = styled.div`
  font-size: 16px;
  display: flex;
  color: #000000;
  justify-content: flex-start;
  align-items: center;
`;

const StyledCardSpecsCardSet = styled(StyledCardSpecs)`
  display: flex;
  justify-content: flex-end !important;
  @media (max-width: 500px) {
    justify-content: flex-start !important;
  }
  ${breakpoints("font-size", "px", [
    { 700: "13" },
    { 650: "12" },
    { 600: "10" },
  ])}
`;

const StyledCardSpecsRarityList = styled(StyledCardSpecs)`
  display: flex;
  justify-content: flex-end !important;
  @media (max-width: 500px) {
    justify-content: flex-start !important;
  }
  ${breakpoints("font-size", "px", [
    { 700: "13" },
    { 650: "12" },
    { 600: "10" },
  ])}
`;

const StyledCardSpecsConditionList = styled(StyledCardSpecs)`
  display: flex;
  justify-content: flex-end !important;
  @media (max-width: 500px) {
    justify-content: flex-start !important;
    flex-grow: 2;
  }
  ${breakpoints("font-size", "px", [
    { 700: "13" },
    { 650: "12" },
    { 600: "10" },
  ])}
`;

const StyledCardSpecsNameGrid = styled(StyledCardSpecs)`
  font-weight: bold;
`;

const StyledCardTitle = styled.div`
  font-weight: bold;
  color: #000000;
  font-size: 20px;
  margin: 0px;
  align-self: center;
`;

const StyledCardTitleList = styled(StyledCardTitle)`
  display: flex;
  @media (max-width: 500px) {
    width: 100%;
    justify-content: flex-start;
  }
  ${breakpoints("font-size", "px", [
    { 700: "15" },
    { 650: "14" },
    { 600: "13" },
  ])}
`;

const StyledUtilDiv = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const StyledContainerInfoList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const StyledListItem = styled.li`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
`;

const StyledGridItem = styled.li`
  display: flex;
  /* width: 100%; */
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;

  border: 1px solid;
  background-color: #d9d9d9;
  border-color: rgba(0, 0, 0, 0.3);
  margin: 5px;
  padding: 5px;

  border-radius: 8px;
  transition: all 0.1s ease-in-out;

  &:hover {
    box-shadow: 1px 1px 16px -6px black;
  }
`;
