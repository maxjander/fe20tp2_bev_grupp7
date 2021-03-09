import styled from 'styled-components'

function App() {
  return (
    <StyledApp>
      <header className="App-header">
        <p>
         Tjena <br />
         Grupp 7
        </p>
      </header>
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
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-align: center;
`
