import { useEffect, useState } from "react";
import LineGraph from "../LineChart";
import styled from "styled-components";

const CardPresentation = ({ card }) => {
  const [apiCard, setApiCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${card.cardId}`)
      .then((res) => res.json())
      .then((res) => setApiCard(res.data[0]))
      .then(setLoading(false));
    return () => {
      setApiCard(null);
    };
  }, [card]);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <StyledWrapper>
            <StyledHeader>{card.cardId}</StyledHeader>
            {apiCard && (
              <>
                <h1>{apiCard.name}</h1>
                <StyledCardImageAndGraph>
                  <img
                    height="auto"
                    width="30%"
                    src={apiCard.card_images[0].image_url}
                  />
                  {card && (
                    <LineGraph data={card.priceChangeDeltaValueHistory} />
                  )}
                </StyledCardImageAndGraph>
              </>
            )}
          </StyledWrapper>
        </>
      )}
    </>
  );
};

export default CardPresentation;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const StyledCardImageAndGraph = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

const StyledHeader = styled.h1`
  display: block;
`;
