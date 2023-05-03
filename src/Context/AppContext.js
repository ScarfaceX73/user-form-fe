import useApp from "../Reducer/AppReducer"
import { useContext } from "react"
import React, { createContext } from 'react'

const AppContext = createContext(undefined)

const AppProvider = ({ children }) => {
    const [state, dispatch] = useApp()
    return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>
}

const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}

export { AppProvider, useAppContext }