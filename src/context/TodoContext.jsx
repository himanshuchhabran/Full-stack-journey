import React, { createContext, useState, useEffect } from 'react'

export const TodoContext = createContext(null)

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos_v1')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('todos_v1', JSON.stringify(todos))
    } catch (e) {}
  }, [todos])

  const addTodo = (text) => {
    const t = { id: Date.now().toString(), text, completed: false, createdAt: Date.now() }
    setTodos((s) => [t, ...s])
  }

  const toggleTodo = (id) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const removeTodo = (id) => {
    setTodos((s) => s.filter((t) => t.id !== id))
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
