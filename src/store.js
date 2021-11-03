import React, { createContext, useReducer } from 'react'
import Reducer from './Reducer'

const initialState = {
  scrollingPosition: {
    x: 0,
    y: 0,
    horizontalScrollDirection: 'down',
    verticleScrollDirection: 'right'
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

export const Context = createContext(initialState)
export default Store
