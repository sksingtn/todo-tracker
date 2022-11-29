import {v4 as uuid} from 'uuid'; 

enum Category {
    TODO = "TODO",
    DOING = "DOING",
    DONE = "DONE"
  }
  
type TodoItem = {
    id: string,
    title : string,
    description : string
  }
  
type TodoStateType = {
      selectedItem : string | null,
      draggedItem : string | null,
      [Category.TODO] : TodoItem[],
      [Category.DOING] : TodoItem[],
      [Category.DONE] : TodoItem[]
      
  }
  

export const todoInitialState : TodoStateType = {
    selectedItem : null,
    draggedItem : null,
    [Category.TODO] : [{id:uuid(),title:"Watch Breaking Bad",description:"I am not in danger I am the danger"},
                      {id:uuid(),title:"Cook Breakfast",description:"Cook noodles for breakfast, the good ones"}],
    [Category.DOING] : [{id:uuid(),title:"Complete Atomic Habits",description:"Was a good read, Recommended to beat procastination!" }],
    [Category.DONE] : [{id:uuid(),title:"Solve Five Leetcode",description:"Solve 5 Leetcode Medium Questions"},
    {id:uuid(),title:"Touch grass",description:"Yup, go outside for once to ensure sanity"}]
  }




  export const getInitialState = (state:TodoStateType):TodoStateType => {
    try {
      let savedState = JSON.parse(localStorage.getItem('TODO_STATE') || "{}")
      if (Object.keys(savedState).length > 0){
        return savedState as TodoStateType
      }
      else{
        return state
      }
    } catch (error) {
      return state
    }
  }
  
export enum TodoActionTypes {
    ADD_TODO = "ADD_TODO",
    EDIT_TODO = "EDIT_TODO",
    DELETE_TODO = "DELETE_TODO",
    DRAG_TODO = "DRAG_TODO",
    SELECT_TODO = "SELECT_TODO",
    RESET_TODO = "RESET_TODO",
    START_DRAG = "START_DRAG",
    END_DRAG = "END_DRAG"

  }


type AddActionType = {
  type : TodoActionTypes.ADD_TODO,
  payload : {title : string,
              description:string,
              category : Category}
}

type EditActionType = {
  type : TodoActionTypes.EDIT_TODO,
  payload : {id:string,
    title : string
    description:string,
    category : Category}
}

type DeleteActionType = {
  type: TodoActionTypes.DELETE_TODO,
  payload : {id:string}
}

type DragActionType = {
  type : TodoActionTypes.DRAG_TODO,
  payload : {id:string,category:Category}
}

type SelectTodoActionType = {
  type : TodoActionTypes.SELECT_TODO,
  payload: {id:string}
}

type ResetTodoActionType = {
  type : TodoActionTypes.RESET_TODO
}

type StartDragActionType = {
  type : TodoActionTypes.START_DRAG,
  payload: {id:string}
}

type EndDragActionType = {
  type : TodoActionTypes.END_DRAG
}

type ActionType = AddActionType | SelectTodoActionType | ResetTodoActionType
 | EditActionType |DeleteActionType | DragActionType | StartDragActionType | EndDragActionType

export function getItemCategory(id:string,state:TodoStateType):Category | null {

  let category = null

  for (let c in Category){
    if (state[c as Category].map(item => item.id).includes(id)){
      category = c as Category
      break
    }
  }

  return category
  

}
  
  
export const todoReducer = (state : TodoStateType,action : ActionType):TodoStateType => {
  
    switch(action.type){
      case TodoActionTypes.ADD_TODO:
        {let existingItems = state[action.payload.category]
        return {...state,[action.payload.category]:[...existingItems,{id:uuid(),
          title:action.payload.title,description:action.payload.description}]}}

      case TodoActionTypes.EDIT_TODO:
        let {id,title,description,category:newItemCategory} = action.payload;
        let oldItemCategory = getItemCategory(id,state)
        
        let newState = {...state}
        if (oldItemCategory === newItemCategory){
          let targetItem = newState[oldItemCategory].find(item => item.id === id)
          if (targetItem){
            targetItem.description = description 
            targetItem.title = title
          }
          return newState
        }
        else{        
          if (oldItemCategory !== null){
            newState[oldItemCategory] = newState[oldItemCategory].filter(item => item.id !== id)
          }

          let movedItem = {id:uuid(),
                            title,
                            description}
          newState[newItemCategory] = [...newState[newItemCategory],movedItem]

          return newState
        }

      
      case TodoActionTypes.DELETE_TODO:
        {const targetId = action.payload.id
        const itemCategory = getItemCategory(targetId,state)
        if (itemCategory !== null){
          let remainingItems = state[itemCategory].filter(item => item.id !== targetId)
          return {...state,[itemCategory]:remainingItems}
        }
        return state}
        


      case TodoActionTypes.DRAG_TODO:
        {
          const {id, category:targetCategory} = action.payload
          const currentCategory = getItemCategory(id,state)
          if (currentCategory !== null && currentCategory !== targetCategory){
            let newState = {... state}
            let item = newState[currentCategory].find(item => item.id === id)
            newState[currentCategory] = newState[currentCategory].filter(item  => item.id !== id)
            if (item !== undefined){
              newState[targetCategory] = [...newState[targetCategory],item]
            }
            return newState
            
          }
          else{
            return state
          }
        }
        
        
      case TodoActionTypes.SELECT_TODO:
        return {...state,selectedItem:action.payload.id}

      case TodoActionTypes.RESET_TODO:
        return {...state,selectedItem:null}

      case TodoActionTypes.START_DRAG:
        return {...state,draggedItem:action.payload.id}

      case TodoActionTypes.END_DRAG:
        return {...state,draggedItem:null}

      default:
        return state
    }
  }