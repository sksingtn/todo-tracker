import Todo from "./components/Todo/Todo"
import styled from "styled-components";
import "./App.css";


const MainContainer = styled.div`
width: 100vw;
height: 100vh;
background:url("./src/assets/background.svg");
padding-top: 3em;
display: flex;
justify-content: center;
align-items: flex-start;
`


function App() {

  return (
    <MainContainer className="App">
      <Todo/>
    </MainContainer>
  )
}

export default App
