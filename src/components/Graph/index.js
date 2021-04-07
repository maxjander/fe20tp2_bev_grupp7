import React from "react";
import { Doughnut } from 'react-chartjs-2';
import styled from "styled-components";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { withFirebase } from "../Firebase";


const PortfolioGraphXD = (props) => {
  

  
  return (
    <StyledWrapper>
      <Doughnut
        data={{
          labels: ["Win", "Loss"],
          datasets: [
            {
              label: "Card Value",
              data: [2,1],
              backgroundColor: ['rgb(54, 162, 235)','rgb(255, 99, 132)'],
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

      
    </StyledWrapper>
  );
};

const PortfolioGraph = withFirebase(PortfolioGraphXD);
export default PortfolioGraph;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
`;
