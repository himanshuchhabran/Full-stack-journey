import React from 'react'
// To switch between Context and RTK implementations, comment/uncomment below imports
import { Provider } from 'react-redux'
import store from './rtk/store'
import ShowTodoListRTK from './rtk/ShowTodoListRTK'

const App = () => {
  return (
    <Provider store={store}>
      <ShowTodoListRTK />
    </Provider>
  )
}

export default App