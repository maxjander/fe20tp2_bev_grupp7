import { useContext } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import lineChartDat from "../XD/index";

import { CardContext } from "../CardContext";

const LineGraph = (props) => {
  const cardContext = useContext(CardContext);
  const allCards = cardContext.cards;
  console.log(allCards);

  if (!props.data) {
    return <></>;
  } else {
    return (
      // <StyledWrapper>
      <Line
        data={{
          labels: Object.keys(props.data).map((timestamp) =>
            new Date(Number(timestamp)).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Value representation over time of total inventory",
              data: Object.values(props.data),
              borderColor: "palevioletred",
            },
          ],
        }}
        // height={100}
        // width={600}
        options={{
          maintainAspectRatio: true,
        }}
      />
      /* </StyledWrapper> */
    );
  }
};

export default LineGraph;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
/*
const LineGraph = () => {
  return (
    <StyledWrapper>
      <Line
        data={{
          labels: Object.keys(lineChartDat).map(timestamp => new Date(Number(timestamp)).toLocaleDateString()),
          datasets: [
            {
              label: "Card Value",
              data: Object.values(lineChartDat),
              borderColor: "palevioletred",
            },
          ],
        }}
        // height={100}
        // width={600}
        options={{
          maintainAspectRatio: true,
        }}
      />

      {console.log(lineChartDat)}
    </StyledWrapper>
  );
};

export default LineGraph;*/
