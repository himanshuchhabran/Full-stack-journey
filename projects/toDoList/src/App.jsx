import React from 'react'
import AddTodo from './components/AddTodo'

import Todos from './components/Todos'
const App = () => {
  return (
   <div className="min-h-screen bg-gray-900 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
            Redux Toolkit Todo App
        </h1>
        <AddTodo />
        <Todos />
      </div>
    </div>
  )
}

export default App