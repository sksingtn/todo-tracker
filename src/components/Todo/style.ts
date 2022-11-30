import styled from "styled-components";

export const TodoContainer = styled.div`
  min-width: 30em;
  min-height: 30em;
  background: white;
  border-radius: 1em;
  box-shadow: -2px -2px 4px 2px rgba(0, 0, 0, 0.1),
    2px 2px 4px 2px rgba(0, 0, 0, 0.1);
  padding: 1em 3em;

  & > .columns {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }
`;

export const TopBar = styled.span`
  position: relative;

  & > .title {
    text-align: center;
    color: var(--primary);
    margin: 0.5em 0em 1em 0em;
    font-family: "Comfortaa", cursive;
    font-size: 2.5em;
  }

  & > button {
    position: absolute;
    top: 0;
    left: 0;
  }
`;