import React from 'react'

const Todo = ({todo, toggleTodo}) => {
  function handleTodoclick() {
    toggleTodo(todo.id)
  }

  return (
    <div>
    <label>
    <input type="checkbox" checked={todo.complete} onChange={handleTodoclick} />
    {todo.name}
    </label>
    </div>
  )
}

export default Todo
