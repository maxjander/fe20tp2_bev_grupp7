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
            {apiCard && (
              <>
                <h1>{apiCard.name}</h1>
                <StyledCardImageAndGraph>
                  <StyledImage
                    // height="auto"
                    // width="30%"
                    src={apiCard.card_images[0].image_url}
                  />
                  {card && (
                    <StyledGraph>
                      <LineGraph
                        data={card.priceChangeDeltaValueHistory}
                        label={apiCard.name}
                      />
                    </StyledGraph>
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
  width: 100%;
`;

const StyledImage = styled.img`
  max-width: 30%;
  @media (max-width: 700px) {
    max-width: 80%;
  }
`;

const StyledGraph = styled.div`
  flex-grow: 2;
  max-width: 70%;
  @media (max-width: 700px) {
    max-width: 100%;
  }
`;

const StyledCardImageAndGraph = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 100%;
  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;

// const StyledHeader = styled.h1`
//   display: block;
// `;
