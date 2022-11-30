import React from "react";
import Card from "react-bootstrap/Card";

import styled from "styled-components";
import { TodoActionTypes } from "../../reducers/todoReducer";
import { Category } from "../../types/todoTypes";

import TodoCard from "../TodoCard/TodoCard";
import {TodoColumnContainer,ColumnTopBar} from "./style"

type TodoItem = {
  id: string;
  title: string;
  description: string;
};

type TodoColumnProps = {
  title: Category;
  cards: TodoItem[];
  draggedItem: string | null;
  dispatch: Function;
};


export default function TodoColumn(props: TodoColumnProps) {

  //Event handler to handle item drop
  const handleDrop = (e: React.DragEvent) => {
    const itemId: string = e.dataTransfer.getData("id");
    props.dispatch({
      type: TodoActionTypes.DRAG_TODO,
      payload: { id: itemId, category: props.title },
    });
    props.dispatch({ type: TodoActionTypes.END_DRAG });
  };

  return (
    <TodoColumnContainer
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <ColumnTopBar>
        <h5 className="col-title">{props.title}</h5>
        <h6 className="col-count">{props.cards.length} items</h6>
      </ColumnTopBar>

      {props.cards.length > 0 && (
        <div className="cards">
          {props.cards.map((card, index) => (
            <TodoCard
              key={card.id}
              id={card.id}
              index={index + 1}
              title={card.title}
              description={card.description}
              draggedItem={props.draggedItem}
              dispatch={props.dispatch}
            />
          ))}
        </div>
      )}
    </TodoColumnContainer>
  );
}
