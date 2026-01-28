import { createSlice } from '@reduxjs/toolkit'

const load = () => {
  try {
    const raw = localStorage.getItem('rtk_todos_v1')
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: load(),
  reducers: {
    addTodo: (state, action) => {
      state.unshift({ id: Date.now().toString(), text: action.payload, completed: false, createdAt: Date.now() })
    },
    toggleTodo: (state, action) => {
      const t = state.find((s) => s.id === action.payload)
      if (t) t.completed = !t.completed
    },
    removeTodo: (state, action) => state.filter((t) => t.id !== action.payload),
  },
})

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions
export default todosSlice.reducer
