import { useReducer } from "react"
import React from 'react'

const initState = {
    firstName: "",
    lastName: "",
    email: "",
    employment: "",
    tech: "",
    preferredTech: ""
}

const useApp = () => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "input":
                return { ...state, ...action.payload }
            case "clear":
                return { ...initState }
            default: return <></>
        }
    }
    const [state, dispatch] = useReducer(reducer, initState);
    return [state, dispatch];
}

export default useApp;