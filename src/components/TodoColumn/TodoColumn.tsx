import React from 'react'
import Card from 'react-bootstrap/Card';

import styled from "styled-components";
import { TodoActionTypes } from '../../reducers/todoReducer';
import { Category } from '../../types/todoTypes';

import TodoCard from "../TodoCard/TodoCard";

type TodoItem = {
    id: string,
    title : string,
    description : string
  }

type TodoColumnProps = {
    title : Category,
    cards : TodoItem[],
    draggedItem : string | null,
    dispatch:Function 
}

const TodoColumnContainer = styled.div`

width: 18em;
background:var(--primary);
padding: 1em 0.6em 0.6em 0.6em;
margin-right: 3em;
border-radius: 0.5em;
box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.05), 2px 5px 4px 2px rgba(0,0,0,0.05);


& .cards{
    background: white;
    padding: 1em 0.5em 0em 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: .5em;

    & > * {
        //margin-bottom: 0.6em;
    }
} 
`

const ColumnTopBar = styled.span`

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
color: white;
padding: 0em 0.3em;

& > .col-title {
    
    
}

& > .col-count {

}

`

export default function TodoColumn(props : TodoColumnProps) {

  const handleDrop = (e:React.DragEvent) => {
    const itemId : string = e.dataTransfer.getData("id")
    props.dispatch({type:TodoActionTypes.DRAG_TODO,payload:{id:itemId,category:props.title}})
    props.dispatch({type:TodoActionTypes.END_DRAG})
  }


  
  
  return (
    <TodoColumnContainer onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <ColumnTopBar>
        <h5 className='col-title'>{props.title}</h5>
        <h6 className='col-count'>{props.cards.length} items</h6>
        </ColumnTopBar>
        
        {props.cards.length > 0 && <div className='cards'>
            {props.cards.map((card,index) => <TodoCard key = {card.id}
             id = {card.id}
             index = {index + 1}
             title = {card.title}
              description = {card.description}
              draggedItem={props.draggedItem}
              dispatch={props.dispatch} />)}
        </div>}
    </TodoColumnContainer>
  )
}
