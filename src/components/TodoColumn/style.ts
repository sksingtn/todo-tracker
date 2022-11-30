import styled from "styled-components";

export const TodoColumnContainer = styled.div`
  width: 18em;
  background: var(--primary);
  padding: 1em 0.6em 0.6em 0.6em;
  margin-right: 3em;
  border-radius: 0.5em;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05),
    2px 5px 4px 2px rgba(0, 0, 0, 0.05);

  & .cards {
    background: white;
    padding: 1em 0.5em 0em 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 0.5em;
  }
`;

export const ColumnTopBar = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0em 0.3em;
`;