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
}) =>
  condition ? (
    <ListItemList
      card={card}
      onRemoveCard={onRemoveCard}
      onToggleEditMode={onToggleEditMode}
      authUser={authUser}
    />
  ) : (
    <ListItemGrid
      card={card}
      image={image}
      onRemoveCard={onRemoveCard}
      onToggleEditMode={onToggleEditMode}
      authUser={authUser}
    />
  );

const ListItemList = ({ card, onRemoveCard, onToggleEditMode, authUser }) => (
  <>
    <StyledContainerInfoList>
      <StyledCardTitleList children={card.cardName} />
      <StyledUtilDiv>
        <StyledCardSpecsCardSet children={card.cardSet.set_code} />
        <StyledCardSpecsRarityList children={card.cardSet.set_rarity_code} />
        <StyledCardSpecsConditionList children={card.cardCondition} />
      </StyledUtilDiv>
      <InventoryUtilButtons
        onRemoveCard={onRemoveCard}
        onToggleEditMode={onToggleEditMode}
        card={card}
        authUser={authUser}
      />
    </StyledContainerInfoList>
  </>
);
const ListItemGrid = ({
  card,
  image,
  onRemoveCard,
  onToggleEditMode,
  authUser,
}) => (
  <>
    <img src={image} width='100%' height='auto' alt={card.cardName} />
    <StyledCardSpecsNameGrid children={card.cardName} />
    <StyledCardSpecs children={card.cardSet.set_code} />
    <StyledCardSpecs children={card.cardSet.set_rarity_code} />
    <StyledCardSpecs children={card.cardCondition} />
    <InventoryUtilButtons
      onRemoveCard={onRemoveCard}
      onToggleEditMode={onToggleEditMode}
      card={card}
      authUser={authUser}
    />
  </>
);
export default ListItemRender;

const StyledCardSpecs = styled.div`
  font-size: 16px;
  display: flex;
  color: #000000;
  justify-content: flex-start;
  align-items: center;
`;

const StyledCardSpecsCardSet = styled(StyledCardSpecs)`
  display: flex;
  /* width: 40%; */
  justify-content: flex-end !important;
  @media (max-width: 500px) {
    justify-content: flex-start !important;
  }
  ${breakpoints("font-size", "px", [
    // { 1200: "17" },
    // { 800: "16" },
    { 700: "13" },
    { 650: "12" },
    { 600: "10" },
  ])}
`;
const StyledCardSpecsRarityList = styled(StyledCardSpecs)`
  display: flex;
  /* width: 20%; */
  justify-content: flex-end !important;
  @media (max-width: 500px) {
    justify-content: flex-start !important;
  }
  ${breakpoints("font-size", "px", [
    // { 1200: "17" },
    // { 800: "16" },
    { 700: "13" },
    { 650: "12" },
    { 600: "10" },
  ])}
`;
const StyledCardSpecsConditionList = styled(StyledCardSpecs)`
  display: flex;
  /* width: 40%; */
  justify-content: flex-end !important;
  @media (max-width: 500px) {
    justify-content: flex-start !important;
    flex-grow: 2;
  }
  ${breakpoints("font-size", "px", [
    // { 1200: "17" },
    // { 800: "16" },
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
  width: 40%;
  margin: 0px;
  align-self: center;
`;

const StyledCardTitleList = styled(StyledCardTitle)`
  display: flex;
  /* width: 80%; */
  @media (max-width: 500px) {
    width: 100%;
    justify-content: flex-start;
  }
  ${breakpoints("font-size", "px", [
    // { 1200: "17" },
    // { 800: "16" },
    { 700: "15" },
    { 650: "14" },
    { 600: "13" },
  ])}
`;

const StyledUtilDiv = styled.div`
  display: flex;
  justify-content: center;
  /* flex-grow: 2; */
  flex-direction: row;
`;

const StyledContainerInfoList = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;
