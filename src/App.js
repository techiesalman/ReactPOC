import React, {useState, useRef, useEffect} from 'react';
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAG_KEY = 'todoApp.todos'

function App() {
  // eslint-disable-next-line
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAG_KEY))
    if(storedToDos) setTodos(storedToDos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAG_KEY, JSON.stringify(todos))
  }, [todos])

  function toogleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddToDo() {
    const name = todoNameRef.current.value
    if(name === '') return;

    setTodos(prevToDos => {
      return [...prevToDos, {id: uuidv4(), name: name, complete: false}]
    })

    todoNameRef.current.value = null
  }

  function handleClearToDos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <ToDoList todos={todos} toggleTodo={toogleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddToDo}>Add Todo</button>
      <button onClick={handleClearToDos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length } left to do</div>
    </>
  );
}

export default App;
