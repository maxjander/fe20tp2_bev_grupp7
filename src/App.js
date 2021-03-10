import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StyledH1, Content, StyledH2, StyledH3 } from './tools/styledComponents.js'
//import { breakpoints } from "./tools/breakpoints.js";

const data = [
  {
    name: "27/2",
    high: 3,
    low: 2,
    amt: 2400
  },
  {
    name: "28/2",
    high: 3000,
    low: 1398,
    amt: 2210
  },
  {
    name: "1/3",
    high: 2000,
    low: 9800,
    amt: 2290
  },
  {
    name: "2/3",
    high: 2780,
    low: 3908,
    amt: 2000
  },
  {
    name: "3/3",
    high: 1890,
    low: 4800,
    amt: 2181
  },
  {
    name: "4/3",
    high: 2390,
    low: 3800,
    amt: 2500
  },
  {
    name: "5/3",
    high: 3490,
    low: 4300,
    amt: 2100
  }
];

function App() {
  return (
    <StyledApp>
      
        <StyledH1>H1 TCG Empire</StyledH1>
        <StyledH2>H2 TCG Empire</StyledH2>
        <StyledH3>H3 TCG Empire</StyledH3>
        <Content>
          Section Styled compontents <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec dui nunc mattis enim. Blandit massa enim nec dui nunc mattis enim ut. Mauris cursus mattis molestie a iaculis at erat. Nibh mauris cursus mattis molestie a iaculis at erat. Nisl pretium fusce id velit ut tortor pretium. Faucibus pulvinar elementum integer enim neque.
          </Content> 
          <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend  />
            <Line type="monotone" dataKey="high"  stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="low"  stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
     
    </StyledApp>
  );
}

export default App;

// Making some styles instead of app.css
const StyledApp = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: white;
  text-align: center;
  font-size: 1rem;

`
