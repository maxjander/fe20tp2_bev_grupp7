import React from "react";
import { Line } from "react-chartjs-2";
import mockDat from "../MockData/index.js";
import FetchRandCard from "../FetchTest/index.js";
import styled from "styled-components";

const PortfolioGraph = (props) => {
  return (
    <StyledWrapper>
      <Line
        data={{
          labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Card Value",
              data: mockDat,
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

      <FetchRandCard />
    </StyledWrapper>
  );
};

export default PortfolioGraph;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
`;
