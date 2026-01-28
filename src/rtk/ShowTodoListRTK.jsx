import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo, removeTodo } from './TodoSlice'

const ShowTodoListRTK = () => {
  const todos = useSelector((s) => s.todos)
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    dispatch(addTodo(value))
    setText('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-2xl">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">To‑Do List (RTK)</h1>
          <p className="text-sm text-gray-500 text-center">Redux Toolkit + react-redux implementation</p>
        </header>

        <form onSubmit={submit} className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Add a new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add</button>
        </form>

        <section className="bg-white shadow rounded-md divide-y divide-gray-100 overflow-hidden">
          {todos.length === 0 && (
            <div className="p-6 text-center text-gray-500">No tasks yet — add your first task.</div>
          )}

          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="w-5 h-5 text-indigo-600 rounded"
                />
                <div>
                  <div className={`text-sm sm:text-base ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {todo.text}
                  </div>
                  <div className="text-xs text-gray-400">{new Date(todo.createdAt).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-4 text-sm text-gray-500 text-center">{todos.length} task{todos.length !== 1 ? 's' : ''}</footer>
      </div>
    </div>
  )
}

export default ShowTodoListRTK