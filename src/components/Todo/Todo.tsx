import { useReducer, useState, useEffect } from "react"

import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';


import { todoReducer, getInitialState ,TodoActionTypes,todoInitialState, getItemCategory} from "../../reducers/todoReducer"
import { Category } from "../../types/todoTypes";
import TodoColumn from "../TodoColumn/TodoColumn";


const TodoContainer = styled.div`
  min-width: 30em;
  min-height: 30em;
  background: white;
  border-radius: 1em;
  box-shadow: -2px -2px 4px 2px rgba(0,0,0,0.1), 2px 2px 4px 2px rgba(0,0,0,0.1);
  padding: 1em 3em;


  & > .columns {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }

`

const TopBar = styled.span`
    position: relative;

    & > .title{
    text-align: center;
    color: var(--primary);
    margin: 0.5em 0em 1em 0em;
    font-family: 'Comfortaa', cursive;
    font-size: 2.5em;
  }

  & > button {
    position: absolute;
    top: 0;
    left: 0;
  }


`

type FormStateType = {
  title:string,
  description:string,
  category : Category
}




export default function Todo() {

  

  const [state, dispatch] = useReducer(todoReducer,todoInitialState, getInitialState)

  const formInitialState : FormStateType = {title:"",description:"",category:Category.TODO}
  const [form,setForm] = useState(formInitialState)

  const canSave : boolean = /^[a-zA-Z ]+$/.test(form.title) && form.description.length >= 25
  const itemSelected = state.selectedItem !== null

  const [show, setShow] = useState(false);

  useEffect(() => {
    localStorage.setItem('TODO_STATE',JSON.stringify(state))
  },[state])

  useEffect(() => {
    
  },[])

  useEffect(() => {

    if (state.selectedItem !== null){
      let category = getItemCategory(state.selectedItem,state)
      if (category !== null){
        let selectedItemDetails = state[category].find(item => item.id === state.selectedItem)
        if (selectedItemDetails !== undefined){
          let {title,description} = selectedItemDetails
          console.log({title,description,category})
          setForm({title,description,category})
        }
        
      }
      
    }
  },[state.selectedItem])

  const handleClose = () => {
    setShow(false);
    dispatch({type:TodoActionTypes.RESET_TODO})
    setForm(formInitialState)
  };
  const handleShow = () => setShow(true);

  const handleCreateOrUpdate = () => {

    if (canSave){
      if (state.selectedItem !== null){
        dispatch({type:TodoActionTypes.EDIT_TODO,payload:{id:state.selectedItem,...form}})
      }
      else{
        dispatch({type:TodoActionTypes.ADD_TODO,payload:form})
      }
      
    }
    handleClose()
  }

  const handleDelete = () => {
    if (state.selectedItem !== null){
      dispatch({type:TodoActionTypes.DELETE_TODO,payload:{id:state.selectedItem}})
    }
    handleClose()
  }


  return (
    <TodoContainer>
      <TopBar>
        <Button variant="outline-primary" className="btn-main" onClick={handleShow}>Add Item</Button>
        <h2 className="title">Todo Tracker</h2>
      </TopBar>

      <Modal show={show || itemSelected} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{itemSelected ? "Update" : "Add"} Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="todo-title">Title</Form.Label>
          <Form.Control
            type="text"
            id="todo-title"
            value = {form.title}
            onChange = {(e) => setForm({...form,title:e.target.value})}

          />
          <Form.Text id="passwordHelpBlock" muted>
            Only Alphabets allowed.
          </Form.Text>

          <br /><br />

          <Form.Label htmlFor="todo-desc">Description</Form.Label>
          <Form.Control
            as="textarea"
            id="todo-desc"
            value = {form.description}
            onChange = {(e) => setForm({...form,description:e.target.value})}

          />
          <Form.Text id="todo-desc" muted>
            Minimum 25 chars needed.
          </Form.Text>

          <br /><br />

          <Form.Label >Select a category:</Form.Label>
          <Form.Select onChange={(e) => {setForm({...form,category:e.target.value as Category})}} value={form.category} aria-label="Todo Category">
            <option value={Category.TODO}>{Category.TODO}</option>
            <option value={Category.DOING}>{Category.DOING}</option>
            <option value={Category.DONE}>{Category.DONE}</option>
          </Form.Select>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          {itemSelected && <Button variant="outline-danger" onClick={handleDelete}>
            Delete Item
          </Button>}
          <Button variant="outline-primary" className="btn-main" disabled = {!canSave} onClick={handleCreateOrUpdate}>
            {itemSelected ? "Update" : "Create"} Item
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="columns">
        <TodoColumn title={Category.TODO} cards={state["TODO"]}  dispatch={dispatch} draggedItem = {state.draggedItem}/>
        <TodoColumn title={Category.DOING} cards={state["DOING"]} dispatch={dispatch} draggedItem = {state.draggedItem}/>
        <TodoColumn title={Category.DONE} cards={state["DONE"]} dispatch={dispatch}  draggedItem = {state.draggedItem}/>
      </div>
    </TodoContainer>
  )
}
