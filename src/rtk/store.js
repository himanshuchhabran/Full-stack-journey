import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './TodoSlice'

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})

store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem('rtk_todos_v1', JSON.stringify(state.todos))
  } catch (e) {}
})

export default store
