import React from "react";
import { Line } from 'react-chartjs-2';
import mockDat from '../MockData/index.js';
import FetchRandCard from '../FetchTest/index.js';

const PortfolioGraph = () =>
{
  return <div>

  <Line
  data={{
    labels: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
    datasets: [
{
      data: mockDat,
    },
  ],

  }}
  height={400}
  width={600}
  options={{
    maintainAspectRatio: false,
  }}
   />

   <FetchRandCard/>

  </div>
}

export default PortfolioGraph
