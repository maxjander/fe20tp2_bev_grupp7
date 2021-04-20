import styled from "styled-components";

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
    <img src={image} width='100%' height='auto' alt={card.cardName} />
    <StyledCardSpecsNameGrid children={card.cardName} />
    <StyledCardSpecs children={card.cardSet.set_code} />
    <StyledCardSpecs children={card.cardSet.set_rarity_code} />
    <StyledCardSpecs children={card.cardCondition} />
  </>
);
export default ListItemRender;

const StyledCardSpecs = styled.div`
  display: flex;
  color: #000000;
  justify-content: flex-end;
  align-items: center;
`;

const StyledCardSpecsCardSet = styled(StyledCardSpecs)`
  width: 25%;
`;
const StyledCardSpecsRarityList = styled(StyledCardSpecs)`
  width: 10%;
`;
const StyledCardSpecsConditionList = styled(StyledCardSpecs)`
  width: 15%;
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
  width: 50%;
  @media (max-width: 800px) {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
`;
