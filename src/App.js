import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import {v4 as uuidv4} from "uuid";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
    const storedTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodo) setTodos(storedTodo)
  }, [])
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodo)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  function handleClearTodo() {
    const newTodos = todos.filter(todo=> !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type='text'></input>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodo}>Clear Complete</button>
    <div>{todos.filter(todo => !todo.complete).length} todo left</div>
    </>
  );
}

export default App;
