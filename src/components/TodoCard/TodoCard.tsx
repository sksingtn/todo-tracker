import React from "react";

import Card from "react-bootstrap/Card";

import { CustomCard } from "./style";
import { TodoActionTypes } from "../../reducers/todoReducer";
import { trimText } from "../../utils/utils";

type TodoItem = {
  id: string;
  index: number;
  title: string;
  description: string;
  draggedItem: string | null;
  dispatch: Function;

};

export default function TodoCard(props: TodoItem) {

  /*Event Handlers for Drag & Drop*/
  const handleStartDrag = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("id", id);
    props.dispatch({ type: TodoActionTypes.START_DRAG, payload: { id } });
  };

  const handleEndDrag = (e: React.DragEvent) => {
    props.dispatch({ type: TodoActionTypes.END_DRAG });
  };

  let draggedStyles = {};

  if (props.id === props.draggedItem) {
    draggedStyles = {
      transform: "scale(0.9)",
      opacity: 0.85,
      transition: "all .2s ease-out",
    };
  }

  return (
    <CustomCard
      bg={"info"}
      key={"info"}
      text={"white"}
      style={draggedStyles}
      className="mb-2"
      draggable
      onDragStart={(e: React.DragEvent) => handleStartDrag(e, props.id)}
      onDragEnd={(e: React.DragEvent) => handleEndDrag(e)}
      onClick={() =>
        props.dispatch({
          type: TodoActionTypes.SELECT_TODO,
          payload: { id: props.id },
        })
      }
    >
      <Card.Header>
        {props.index}. {trimText(props.title, 18)}
      </Card.Header>
      <Card.Body>
        <Card.Text>{trimText(props.description, 60)}</Card.Text>
      </Card.Body>
    </CustomCard>
  );
}
