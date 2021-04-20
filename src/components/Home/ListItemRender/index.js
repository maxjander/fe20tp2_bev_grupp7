import styled from "styled-components";
import { breakpoints } from "../../../constants/breakpoints.js";

const ListItemRender = ({ condition, card, image }) =>
  condition ? (
    <ListItemList card={card} />
  ) : (
    <ListItemGrid card={card} image={image} />
  );

const ListItemList = ({ card }) => (
  <>
    <StyledCardTitleList children={card.cardName} />
    <StyledCardSpecsCardSet children={card.cardSet.set_code} />
    <StyledCardSpecsRarityList children={card.cardSet.set_rarity_code} />
    <StyledCardSpecsConditionList children={card.cardCondition} />
  </>
);
const ListItemGrid = ({ card, image }) => (
  <>
    <img src={image} width="100%" height="auto" alt={card.cardName} />
    <StyledCardSpecsNameGrid children={card.cardName} />
    <StyledCardSpecs children={card.cardSet.set_code} />
    <StyledCardSpecs children={card.cardSet.set_rarity_code} />
    <StyledCardSpecs children={card.cardCondition} />
  </>
);
export default ListItemRender;

const StyledCardSpecs = styled.div`
  font-size: 18px;
  display: flex;
  color: #000000;
  justify-content: flex-start;
  align-items: center;
`;

const StyledCardSpecsCardSet = styled(StyledCardSpecs)`
  width: 25%;
  justify-content: flex-end;
  ${breakpoints("font-size", "px", [
    { 1200: "17" },
    { 800: "16" },
    { 700: "13" },
    { 650: "12" },
    { 600: "10" },
  ])}
`;
const StyledCardSpecsRarityList = styled(StyledCardSpecs)`
  width: 10%;
  justify-content: flex-end;
  ${breakpoints("font-size", "px", [
    { 1200: "17" },
    { 800: "16" },
    { 700: "13" },
    { 650: "12" },
    { 600: "10" },
  ])}
`;
const StyledCardSpecsConditionList = styled(StyledCardSpecs)`
  width: 15%;
  justify-content: flex-end;
  ${breakpoints("font-size", "px", [
    { 1200: "17" },
    { 800: "16" },
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
  ${breakpoints("font-size", "px", [
    { 1200: "17" },
    { 800: "16" },
    { 700: "15" },
    { 650: "14" },
    { 600: "13" },
  ])}
`;
