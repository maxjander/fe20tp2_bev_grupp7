import React, {useEffect, useState} from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { withFirebase } from "../Firebase";


const UserGraph = ({ cards, authUser }) => {

  const [data, setData] = useState(null);  

  useEffect(() => {
    const userCardList = cards.filter((card) => card.userId === authUser.uid);
    var pieData = { pos: 0, neg: 0 }
    userCardList.forEach((card, k) => {
      let data = card.priceChangeDeltaValueHistory
      if (data) {
      const cardDelta = Object.keys(data);
      const lastDelta = data[cardDelta[cardDelta.length -1]];
      if (typeof lastDelta === 'number') {
      
      if(lastDelta > 0)
      {
       
       pieData.pos += lastDelta

      }
      else if(lastDelta < 0)
      {
        pieData.neg += lastDelta
       
      }
    }
  }
    })
    setData(pieData)
    
  }, [cards,authUser.uid])

  return (
    data ?
    <StyledWrapper>
      <Doughnut
        data={{
          labels: ["Win", "Loss"],
          datasets: [
            {
              label: "Card Value",
              data: [...Object.values(data)],
              backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
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
    </StyledWrapper> : null
    
  );
  
};

const PortfolioGraph = withFirebase(UserGraph);
export default PortfolioGraph;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: auto; 
`;

